import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

interface Client {
  id: number;
  full_name: string;
}

interface Staff {
  id: number;
  full_name: string;
}

@Component({
  selector: 'app-visit-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './visit-form.html',
  styleUrl: './visit-form.scss'
})
export class VisitFormComponent implements OnInit {
  isEditMode = false;
  visitId: number | null = null;
  loading = false;
  saving = false;
  error = '';

  clients: Client[] = [];
  staffList: Staff[] = [];

  formData: any = {
    client: '',
    staff: '',
    date: '',
    time: '',
    type: 'medication',
    status: 'completed',
    notes: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Dummy data for now
    this.clients = [
      { id: 1, full_name: 'Jane Doe' },
      { id: 2, full_name: 'John Smith' }
    ];

    this.staffList = [
      { id: 1, full_name: 'Brian Mbevi' },
      { id: 2, full_name: 'Sarah Lee' }
    ];

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.visitId = Number(id);
      this.loading = true;

      // Dummy load
      setTimeout(() => {
        this.formData = {
          client: 1,
          staff: 1,
          date: '2026-05-19',
          time: '14:00',
          type: 'medication',
          status: 'completed',
          notes: 'Medication administered'
        };
        this.loading = false;
        this.cdr.detectChanges();
      }, 500);
    }
  }

  save() {
    this.saving = true;

    setTimeout(() => {
      this.saving = false;
      this.router.navigate(['/visits']);
    }, 800);
  }
}
