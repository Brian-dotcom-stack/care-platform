import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface Client {
  id: number;
  full_name: string;
  date_of_birth: string;
  status: string;
  key_worker_name: string | null;
  phone: string;
  photo: string | null;
}

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.scss'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filtered: Client[] = [];
  searchTerm = '';
  selectedStatus = '';
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    this.http.get<Client[]>('http://localhost:8000/api/clients/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.clients = [...data];
        this.filtered = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load clients. Status: ' + err.status;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filter() {
    this.filtered = this.clients.filter(c => {
      const matchSearch = c.full_name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus
        ? c.status === this.selectedStatus : true;
      return matchSearch && matchStatus;
    });
  }

  getInitials(name: string): string {
    if (!name || name.trim() === '') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      active:   'badge-green',
      inactive: 'badge-gray',
      deceased: 'badge-red',
      hospital: 'badge-amber',
    };
    return map[status] || 'badge-gray';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      active:   'Active',
      inactive: 'Inactive',
      deceased: 'Deceased',
      hospital: 'In hospital',
    };
    return map[status] || status;
  }

  getAge(dob: string): number {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }
}