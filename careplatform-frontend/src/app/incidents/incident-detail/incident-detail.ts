import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './incident-detail.html',
  styleUrl: './incident-detail.scss'
})
export class IncidentDetailComponent implements OnInit {
  incident: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('access_token');
    
    this.http.get(`http://localhost:8000/api/incidents/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => {
        this.incident = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load incident details.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getTypeLabel(type: string): string {
    const map: Record<string, string> = {
      fall: 'Fall', medication: 'Medication error', behaviour: 'Behaviour',
      injury: 'Injury', safeguarding: 'Safeguarding', near_miss: 'Near miss', other: 'Other'
    };
    return map[type] || type;
  }
}