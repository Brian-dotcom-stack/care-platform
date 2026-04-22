import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StaffService } from '../staff';
import { Staff, TrainingRecord } from '../models/staff';

@Component({
  selector: 'app-staff-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './staff-detail.html',
  styleUrl: './staff-detail.scss'
})
export class StaffDetailComponent implements OnInit {
  member: Staff | null = null;
  training: TrainingRecord[] = [];
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.staffService.getOne(id).subscribe({
      next: (data) => {
        this.member = data;
        this.loading = false;
        this.cdr.detectChanges();
        this.loadTraining(id);
      },
      error: () => {
        this.error = 'Could not load staff member.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadTraining(id: number) {
    this.staffService.getTraining(id).subscribe({
      next: (data) => {
        this.training = [...data];
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  getInitials(name: string): string {
    if (!name || name.trim() === '') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  isExpiringSoon(dateStr: string | null): boolean {
    if (!dateStr) return false;
    const expiry = new Date(dateStr);
    const soon = new Date();
    soon.setDate(soon.getDate() + 30);
    return expiry <= soon;
  }
}