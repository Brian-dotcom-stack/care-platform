import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Incident {
  id: number;
  client_name: string;
  incident_type: string;
  severity: string;
  status: string;
  date_occurred: string;
  reported_by_name: string;
  description: string;
}

@Component({
  selector: 'app-incident-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './incident-list.html',
  styleUrl: './incident-list.scss'
})
export class IncidentListComponent implements OnInit {
  incidents: Incident[] = [];
  filtered: Incident[] = [];
  selectedStatus = '';
  selectedSeverity = '';
  loading = true;
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    this.http.get<Incident[]>('http://localhost:8000/api/incidents/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.incidents = [...data];
        this.filtered = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load incidents. Status: ' + err.status;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filter() {
    this.filtered = this.incidents.filter(i => {
      const matchStatus = this.selectedStatus ? i.status === this.selectedStatus : true;
      const matchSeverity = this.selectedSeverity ? i.severity === this.selectedSeverity : true;
      return matchStatus && matchSeverity;
    });
  }

  getSeverityBadge(severity: string): string {
    const map: Record<string, string> = {
      low:      'badge-blue',
      medium:   'badge-amber',
      high:     'badge-red',
      critical: 'badge-red',
    };
    return map[severity] || 'badge-gray';
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      open:         'badge-red',
      under_review: 'badge-amber',
      closed:       'badge-green',
    };
    return map[status] || 'badge-gray';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      fall:         'Fall',
      medication:   'Medication error',
      behaviour:    'Behaviour',
      injury:       'Injury',
      safeguarding: 'Safeguarding',
      near_miss:    'Near miss',
      other:        'Other',
    };
    return map[type] || type;
  }
}