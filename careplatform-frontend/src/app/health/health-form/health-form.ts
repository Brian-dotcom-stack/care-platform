import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Client { id: number; full_name: string; }

@Component({
  selector: 'app-health-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './health-form.html',
  styleUrl: './health-form.scss'
})
export class HealthFormComponent implements OnInit {
  isEditMode = false;
  reportId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  clients: Client[] = [];

  formData: any = {
    client: '',
    date_recorded: '',
    mood: '',
    appetite: '',
    temperature: '',
    pulse: '',
    blood_pressure: '',
    oxygen_level: '',
    fluid_intake_ml: '',
    food_intake: '',
    bowel_movement: false,
    sleep_quality: '',
    observations: '',
    concerns: '',
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
      .subscribe({ next: (data) => { this.clients = data; this.cdr.detectChanges(); } });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.reportId = Number(id);
      this.loading = true;
      this.http.get<any>(`http://localhost:8000/api/health-reports/${this.reportId}/`, { headers })
        .subscribe({
          next: (data) => { this.formData = { ...data }; this.loading = false; this.cdr.detectChanges(); },
          error: () => { this.error = 'Could not load report.'; this.loading = false; this.cdr.detectChanges(); }
        });
    }
  }

  save() {
    this.saving = true;
    this.error = '';
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    const request = this.isEditMode
      ? this.http.patch<any>(`http://localhost:8000/api/health-reports/${this.reportId}/`, this.formData, { headers })
      : this.http.post<any>('http://localhost:8000/api/health-reports/', this.formData, { headers });

    request.subscribe({
      next: (res) => this.router.navigate(['/health', res.id]),
      error: () => { this.error = 'Could not save report.'; this.saving = false; this.cdr.detectChanges(); }
    });
  }
}