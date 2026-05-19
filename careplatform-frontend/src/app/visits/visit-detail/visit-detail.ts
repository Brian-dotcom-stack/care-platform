import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-visit-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './visit-detail.html',
  styleUrl: './visit-detail.scss'
})
export class VisitDetailComponent implements OnInit {
  visit: any = null;
  loading = true;
  error = '';
  id: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // Dummy data for now
    setTimeout(() => {
      this.visit = {
        id: this.id,
        client_name: 'Jane Doe',
        staff_name: 'Brian Mbevi',
        date: '2026-05-19',
        time: '14:00',
        type: 'medication',
        status: 'completed',
        notes: 'Medication administered'
      };

      this.loading = false;
      this.cdr.detectChanges();
    }, 400);
  }

  getTypeBadge(type: string): string {
    const map: Record<string, string> = {
      medication: 'badge-blue',
      welfare: 'badge-green',
      behaviour: 'badge-amber',
      other: 'badge-gray'
    };
    return map[type] || 'badge-gray';
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      completed: 'badge-green',
      pending: 'badge-amber',
      cancelled: 'badge-red'
    };
    return map[status] || 'badge-gray';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      medication: 'Medication',
      welfare: 'Welfare check',
      behaviour: 'Behaviour',
      other: 'Other'
    };
    return map[type] || type;
  }
}
