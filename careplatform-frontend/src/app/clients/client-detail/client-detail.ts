import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Client {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  address: string;
  phone: string;
  nhs_number: string;
  status: string;
  key_worker_name: string | null;
  gp_name: string;
  gp_phone: string;
  allergies: string;
  medical_notes: string;
}

interface CarePlan {
  id: number;
  title: string;
  status: string;
  created_by_name: string | null;
  created_at: string;
  next_review: string | null;
  content: string;
  goals: string;
}

interface NextOfKin {
  id: number;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  is_primary: boolean;
}

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.scss'
})
export class ClientDetailComponent implements OnInit {
  client: Client | null = null;
  carePlans: CarePlan[] = [];
  nextOfKin: NextOfKin[] = [];
  loading = true;
  error = '';
  clientId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<Client>(`http://localhost:8000/api/clients/${this.clientId}/`, { headers })
      .subscribe({
        next: (data) => {
          this.client = data;
          this.loading = false;
          this.cdr.detectChanges();
          this.loadCarePlans(headers);
          this.loadNextOfKin(headers);
        },
        error: () => {
          this.error = 'Could not load client.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  loadCarePlans(headers: any) {
    this.http.get<CarePlan[]>(
      `http://localhost:8000/api/clients/${this.clientId}/care-plans/`,
      { headers }
    ).subscribe({
      next: (data) => {
        this.carePlans = [...data];
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  loadNextOfKin(headers: any) {
    this.http.get<NextOfKin[]>(
      `http://localhost:8000/api/clients/${this.clientId}/next-of-kin/`,
      { headers }
    ).subscribe({
      next: (data) => {
        this.nextOfKin = [...data];
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  getInitials(name: string): string {
    if (!name || name.trim() === '') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }

  getAge(dob: string): number {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      active: 'badge-green',
      inactive: 'badge-gray',
      deceased: 'badge-red',
      hospital: 'badge-amber',
    };
    return map[status] || 'badge-gray';
  }

  getPlanBadge(status: string): string {
    const map: Record<string, string> = {
      active:   'badge-green',
      draft:    'badge-gray',
      reviewed: 'badge-blue',
      archived: 'badge-gray',
    };
    return map[status] || 'badge-gray';
  }
}