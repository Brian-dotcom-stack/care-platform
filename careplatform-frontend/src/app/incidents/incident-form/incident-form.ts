import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Client {
  id: number;
  full_name: string;
}

@Component({
  selector: 'app-incident-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './incident-form.html',
  styleUrl: './incident-form.scss'
})
export class IncidentFormComponent implements OnInit {
  isEditMode = false;
  incidentId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  clients: Client[] = [];

  formData: any = {
    client: '',
    incident_type: 'fall',
    severity: 'medium',
    status: 'open',
    date_occurred: '',
    location: '',
    description: '',
    immediate_action: '',
    follow_up: '',
    witnesses: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<Client[]>('http://localhost:8000/api/clients/', { headers })
      .subscribe({
        next: (data) => {
          this.clients = data;
          this.cdr.detectChanges();
        },
        error: () => {}
      });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.incidentId = Number(id);
      this.loading = true;
      this.http.get<any>(`http://localhost:8000/api/incidents/${this.incidentId}/`, { headers })
        .subscribe({
          next: (data) => {
            this.formData = { ...data };
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
  }

  save() {
    this.saving = true;
    this.error = '';
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    if (this.isEditMode && this.incidentId) {
      this.http.patch<any>(
        `http://localhost:8000/api/incidents/${this.incidentId}/`,
        this.formData, { headers }
      ).subscribe({
        next: (res) => this.router.navigate(['/incidents', res.id]),
        error: () => {
          this.error = 'Could not save changes.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.http.post<any>(
        'http://localhost:8000/api/incidents/',
        this.formData, { headers }
      ).subscribe({
        next: (res) => this.router.navigate(['/incidents', res.id]),
        error: () => {
          this.error = 'Could not log incident.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}