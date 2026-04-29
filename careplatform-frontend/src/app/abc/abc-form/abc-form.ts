import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Client { id: number; full_name: string; }

@Component({
  selector: 'app-abc-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './abc-form.html',
  styleUrl: './abc-form.scss'
})
export class AbcFormComponent implements OnInit {
  isEditMode = false;
  chartId: number | null = null;
  loading = false;
  saving = false;
  error = '';
  clients: Client[] = [];

  formData: any = {
    client: '',
    date_occurred: '',
    duration_minutes: '',
    intensity: 'moderate',
    behaviour_type: 'verbal',
    antecedent: '',
    behaviour: '',
    consequence: '',
    location: '',
    witnesses: '',
    follow_up: '',
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
      this.chartId = Number(id);
      this.loading = true;
      this.http.get<any>(`http://localhost:8000/api/abc-charts/${this.chartId}/`, { headers })
        .subscribe({
          next: (data) => { this.formData = { ...data }; this.loading = false; this.cdr.detectChanges(); },
          error: () => { this.error = 'Could not load ABC chart.'; this.loading = false; this.cdr.detectChanges(); }
        });
    }
  }

  save() {
    this.saving = true;
    this.error = '';
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    const request = this.isEditMode
      ? this.http.patch<any>(`http://localhost:8000/api/abc-charts/${this.chartId}/`, this.formData, { headers })
      : this.http.post<any>('http://localhost:8000/api/abc-charts/', this.formData, { headers });

    request.subscribe({
      next: (res) => this.router.navigate(['/abc', res.id]),
      error: () => { this.error = 'Could not save ABC chart.'; this.saving = false; this.cdr.detectChanges(); }
    });
  }
}