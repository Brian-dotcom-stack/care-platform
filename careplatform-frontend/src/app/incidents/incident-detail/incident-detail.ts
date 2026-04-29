import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Incident {
  id: number;
  client_name: string;
  reported_by_name: string;
  incident_type: string;
  severity: string;
  status: string;
  date_occurred: string;
  location: string;
  description: string;
  immediate_action: string;
  follow_up: string;
  witnesses: string;
  created_at: string;
}

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incident-detail.html',
  styleUrl: './incident-detail.scss'
})
export class IncidentDetailComponent implements OnInit {
  incident: Incident | null = null;
  loading = true;
  error = '';
  incidentId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.incidentId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access_token');
    this.http.get<Incident>(`http://localhost:8000/api/incidents/${this.incidentId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.incident = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load incident.';
        this.loading = false;
        this.cdr.detectChanges();
      }
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