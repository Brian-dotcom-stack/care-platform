import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

  clients: any[] = [];
  staffList: any[] = [];

  formData: any = {
    client: '',
    staff: '',
    date: '',
    time: '',
    type: 'medication',
    status: 'completed',
    notes: ''
  };

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load clients
    this.http.get<any[]>(`${this.api}/clients/`, { headers })
      .subscribe(data => this.clients = data);

    // Load staff
    this.http.get<any[]>(`${this.api}/staff/`, { headers })
      .subscribe(data => this.staffList = data);

    // Edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.visitId = Number(id);
      this.loading = true;

      this.http.get<any>(`${this.api}/visits/${this.visitId}/`, { headers })
        .subscribe({
          next: (data) => {
            this.formData = {
              client: data.client,
              staff: data.staff,
              date: data.date,
              time: data.time,
              type: data.type,
              status: data.status,
              notes: data.notes
            };
            this.loading = false;
          },
          error: () => {
            this.error = 'Could not load visit.';
            this.loading = false;
          }
        });
    }
  }

  save() {
    this.saving = true;
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    if (this.isEditMode && this.visitId) {
      this.http.patch(`${this.api}/visits/${this.visitId}/`, this.formData, { headers })
        .subscribe({
          next: (res: any) => this.router.navigate(['/visits', res.id]),
          error: () => {
            this.error = 'Could not save changes.';
            this.saving = false;
          }
        });
    } else {
      this.http.post(`${this.api}/visits/`, this.formData, { headers })
        .subscribe({
          next: (res: any) => this.router.navigate(['/visits', res.id]),
          error: () => {
            this.error = 'Could not log visit.';
            this.saving = false;
          }
        });
    }
  }
}
