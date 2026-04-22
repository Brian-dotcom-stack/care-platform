import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-shift-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './shift-form.html',
  styleUrl: './shift-form.scss'
})
export class ShiftFormComponent implements OnInit {
  staffList: any[] = [];
  clients: any[] = [];
  saving = false;
  error = '';

  formData = {
    staff: '',
    client: '',
    start_time: '',
    end_time: '',
    shift_type: 'day',
    notes: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    // Load Staff for dropdown
    this.http.get<any[]>('http://localhost:8000/api/staff/', { headers }).subscribe(data => {
      this.staffList = data;
      this.cdr.detectChanges();
    });

    // Load Clients for dropdown
    this.http.get<any[]>('http://localhost:8000/api/clients/', { headers }).subscribe(data => {
      this.clients = data;
      this.cdr.detectChanges();
    });
  }

  save() {
    this.saving = true;
    const token = localStorage.getItem('access_token');
    this.http.post('http://localhost:8000/api/shifts/', this.formData, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: () => this.router.navigate(['/rostering']),
      error: () => {
        this.error = 'Error allocating shift. Check all fields.';
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }
}