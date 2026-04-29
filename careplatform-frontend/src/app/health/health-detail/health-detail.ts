import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface HealthReport {
  id: number;
  client_name: string;
  recorded_by_name: string;
  date_recorded: string;
  mood: string;
  appetite: string;
  temperature: number | null;
  pulse: number | null;
  blood_pressure: string;
  oxygen_level: number | null;
  fluid_intake_ml: number | null;
  food_intake: string;
  bowel_movement: boolean;
  sleep_quality: string;
  observations: string;
  concerns: string;
}

@Component({
  selector: 'app-health-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './health-detail.html',
  styleUrl: './health-detail.scss'
})
export class HealthDetailComponent implements OnInit {
  report: HealthReport | null = null;
  loading = true;
  error = '';
  reportId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.reportId = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('access_token');
    this.http.get<HealthReport>(`http://localhost:8000/api/health-reports/${this.reportId}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.report = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Could not load health report.';
        this.loading = false;
        this.cdr.detectChanges();
      }
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