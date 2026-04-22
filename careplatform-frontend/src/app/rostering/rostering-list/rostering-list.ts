import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rostering-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rostering-list.html',
  styleUrl: './rostering-list.scss'
})
export class RosteringListComponent implements OnInit {
  shifts: any[] = [];
  loading = true;
  isAdmin = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    this.isAdmin = true;
    this.http.get<any[]>('http://localhost:8000/api/shifts/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.shifts = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}