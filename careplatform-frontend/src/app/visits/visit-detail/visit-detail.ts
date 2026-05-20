import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  private api = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<any>(`${this.api}/visits/${this.id}/`, { headers })
      .subscribe({
        next: (data) => {
          this.visit = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Could not load visit.';
          this.loading = false;
        }
      });
  }

  getTypeLabel(type: string): string {
    const map: any = {
      medication: 'Medication',
      welfare: 'Welfare check',
      behaviour: 'Behaviour',
      other: 'Other'
    };
    return map[type] || type;
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
