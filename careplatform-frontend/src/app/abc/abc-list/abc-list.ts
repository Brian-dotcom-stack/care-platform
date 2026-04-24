import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ABCChart {
  id: number;
  client_name: string;
  date_occurred: string;
  behaviour_type: string;
  intensity: string;
  recorded_by_name: string;
}

@Component({
  selector: 'app-abc-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './abc-list.html',
  styleUrl: './abc-list.scss'
})
export class AbcListComponent implements OnInit {
  charts: ABCChart[] = [];
  filtered: ABCChart[] = [];
  searchTerm = '';
  selectedIntensity = '';
  loading = true;
  error = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const token = localStorage.getItem('access_token');
    this.http.get<ABCChart[]>('http://localhost:8000/api/abc-charts/', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.charts = [...data];
        this.filtered = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load ABC charts. Status: ' + err.status;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  filter() {
    this.filtered = this.charts.filter(c => {
      const matchSearch = c.client_name.toLowerCase()
        .includes(this.searchTerm.toLowerCase());
      const matchIntensity = this.selectedIntensity
        ? c.intensity === this.selectedIntensity : true;
      return matchSearch && matchIntensity;
    });
  }

  getIntensityBadge(intensity: string): string {
    const map: Record<string, string> = {
      mild:     'badge-blue',
      moderate: 'badge-amber',
      severe:   'badge-red',
    };
    return map[intensity] || 'badge-gray';
  }

  getTypeBadge(type: string): string {
    const map: Record<string, string> = {
      verbal:    'badge-amber',
      physical:  'badge-red',
      self_harm: 'badge-red',
      property:  'badge-amber',
      non_verbal:'badge-blue',
      other:     'badge-gray',
    };
    return map[type] || 'badge-gray';
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      verbal:    'Verbal',
      physical:  'Physical',
      self_harm: 'Self harm',
      property:  'Property damage',
      non_verbal:'Non verbal',
      other:     'Other',
    };
    return map[type] || type;
  }
}