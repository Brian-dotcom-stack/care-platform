import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-visit-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, FormsModule],
  templateUrl: './visit-list.html',
  styleUrl: './visit-list.scss'
})
export class VisitListComponent implements OnInit {
  visits: any[] = [];
  filtered: any[] = [];
  staffOptions: string[] = [];

  searchTerm = '';
  selectedStaff = '';

  loading = true;
  error = '';

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any[]>(`${this.api}/visits/`, { headers })
      .subscribe({
        next: (data) => {
          this.visits = data;
          this.filtered = data;
          this.staffOptions = Array.from(
            new Set(
              data
                .map(v => v.staff_name)
                .filter((n: string | null) => !!n)
            )
          );
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load visits.';
          this.loading = false;
        }
      });
  }

  applyFilters() {
    this.filtered = this.visits.filter(v => {
      const matchesSearch =
        !this.searchTerm ||
        (v.client_name || '').toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (v.staff_name || '').toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStaff =
        !this.selectedStaff || v.staff_name === this.selectedStaff;

      return matchesSearch && matchesStaff;
    });
  }

  getTypeBadge(type: string): string {
    const map: any = {
      medication: 'badge-blue',
      welfare: 'badge-green',
      behaviour: 'badge-amber',
      other: 'badge-gray'
    };
    return map[type] || 'badge-gray';
  }

  getStatusBadge(status: string): string {
    const map: any = {
      completed: 'badge-green',
      pending: 'badge-amber',
      cancelled: 'badge-red'
    };
    return map[status] || 'badge-gray';
  }
}
