import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface VisitLog {
  id: number;
  client_name: string;
  staff_name: string;
  date: string;
  time: string;
  notes: string;
  type: string;
  status: string;
}

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './visit-list.html',
  styleUrl: './visit-list.scss'
})
export class VisitListComponent implements OnInit {
  visits: VisitLog[] = [];
  filtered: VisitLog[] = [];
  searchTerm = '';
  selectedStaff = '';
  loading = true;
  error = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Dummy data for demo
    this.visits = [
      {
        id: 1,
        client_name: 'Jane Doe',
        staff_name: 'Brian Mbevi',
        date: '2026-05-19',
        time: '14:00',
        notes: 'Medication administered',
        type: 'medication',
        status: 'completed'
      },
      {
        id: 2,
        client_name: 'John Smith',
        staff_name: 'Sarah Lee',
        date: '2026-05-19',
        time: '10:30',
        notes: 'Routine welfare check',
        type: 'welfare',
        status: 'pending'
      }
    ];

    this.filtered = [...this.visits];
    this.loading = false;
    this.cdr.detectChanges();
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
}
