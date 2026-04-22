import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-form.html',
  styleUrl: './client-form.scss'
})
export class ClientFormComponent implements OnInit {
  isEditMode = false;
  clientId: number | null = null;
  loading = false;
  saving = false;
  error = '';

  formData: any = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: 'female',
    phone: '',
    address: '',
    nhs_number: '',
    status: 'active',
    gp_name: '',
    gp_phone: '',
    allergies: '',
    medical_notes: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientId = Number(id);
      this.loading = true;
      const token = localStorage.getItem('access_token');
      this.http.get<any>(`http://localhost:8000/api/clients/${this.clientId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: (data) => {
          this.formData = { ...data };
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Could not load client.';
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

    if (this.isEditMode && this.clientId) {
      this.http.patch<any>(
        `http://localhost:8000/api/clients/${this.clientId}/`,
        this.formData, { headers }
      ).subscribe({
        next: (res) => this.router.navigate(['/clients', res.id]),
        error: () => {
          this.error = 'Could not save changes.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.http.post<any>(
        'http://localhost:8000/api/clients/',
        this.formData, { headers }
      ).subscribe({
        next: (res) => this.router.navigate(['/clients', res.id]),
        error: () => {
          this.error = 'Could not create client.';
          this.saving = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}