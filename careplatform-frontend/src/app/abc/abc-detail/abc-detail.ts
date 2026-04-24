import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AbcService } from '../abc.service';

@Component({
  selector: 'app-abc-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4" *ngIf="chart">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>ABC Analysis: {{ chart.client_name }}</h2>
        <span class="badge" [ngClass]="{
          'bg-danger': chart.intensity === 'severe',
          'bg-warning': chart.intensity === 'moderate',
          'bg-info': chart.intensity === 'mild'
        }">{{ chart.intensity | uppercase }}</span>
      </div>

      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card h-100 border-primary">
            <div class="card-header bg-primary text-white">A - Antecedent</div>
            <div class="card-body">{{ chart.antecedent }}</div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border-warning">
            <div class="card-header bg-warning text-dark">B - Behaviour</div>
            <div class="card-body">
              <strong>Type:</strong> {{ chart.behaviour_type }}<br>
              <hr>
              {{ chart.behaviour }}
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 border-success">
            <div class="card-header bg-success text-white">C - Consequence</div>
            <div class="card-body">{{ chart.consequence }}</div>
          </div>
        </div>
      </div>

      <div class="card shadow-sm mb-4">
        <div class="card-body">
          <h5>Additional Details</h5>
          <p><strong>Location:</strong> {{ chart.location }}</p>
          <p><strong>Duration:</strong> {{ chart.duration_minutes }} minutes</p>
          <p><strong>Staff Member:</strong> {{ chart.recorded_by_name }}</p>
        </div>
      </div>
      
      <button class="btn btn-outline-primary" routerLink="/abc">Back to List</button>
    </div>
  `
})

export class AbcDetailComponent implements OnInit {
  chart: any;

  constructor(
    private route: ActivatedRoute,
    private abcService: AbcService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.abcService.get(id).subscribe({
      next: (data: any) => {
        this.chart = data;
      },
      error: (err: any) => console.error(err)
    });
  }
}