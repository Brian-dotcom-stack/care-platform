import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface HealthReport {
  id: number;
  client_name: string;
  date_recorded: string;
  mood: string;
  appetite: string;
  concerns: string;
  recorded_by_name: string;
}

@Component({
  selector: 'app-health-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './health-list.html',
  styleUrl: './health-list.scss'
})
export class HealthListComponent implements OnInit {
  reports: HealthReport[] = [];
  filtered: HealthReport[] = [];
  searchTerm = '';
  selectedMood = '';
  loading = true;
  error = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    this.http.get<HealthReport[]>('http://localhost:8000/api/health-reports/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.reports = [...data];
        this.filtered = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load health reports. Status: ' + err.status;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filter() {
    this.filtered = this.reports.filter(r => {
      const matchSearch = r.client_name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchMood = this.selectedMood ? r.mood === this.selectedMood : true;
      return matchSearch && matchMood;
    });
  }

  getMoodBadge(mood: string): string {
    const map: Record<string, string> = {
      happy:    'badge-green',
      calm:     'badge-blue',
      anxious:  'badge-amber',
      agitated: 'badge-red',
      low:      'badge-amber',
      confused: 'badge-red',
    };
    return map[mood] || 'badge-gray';
  }
}