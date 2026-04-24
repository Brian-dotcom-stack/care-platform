import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ABCChart {
  id: number;
  client_name: string;
  date_occurred: string;
  duration_minutes: number | null;
  intensity: string;
  behaviour_type: string;
  antecedent: string;
  behaviour: string;
  consequence: string;
  location: string;
  witnesses: string;
  follow_up: string;
  recorded_by_name: string;
  created_at: string;
}

@Component({
  selector: 'app-abc-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './abc-detail.html',
  styleUrl: './abc-detail.scss'
})
export class AbcDetailComponent implements OnInit {
  chart: ABCChart | null = null;
  loading = true;
  error = '';
  chartId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.chartId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access_token');
    this.http.get<ABCChart>(`http://localhost:8000/api/abc-charts/${this.chartId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.chart = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load ABC chart.';
        this.loading = false;
        this.cdr.detectChanges();
      }
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