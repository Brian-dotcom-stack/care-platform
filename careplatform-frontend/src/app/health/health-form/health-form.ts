import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthService } from '../health.service'; // Ensure you have a basic service for API calls

@Component({
  selector: 'app-health-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2 class="mb-4">{{ isEdit ? 'Edit' : 'New' }} Health Report</h2>
      <form (ngSubmit)="save()" #healthForm="ngForm" class="card p-4 shadow-sm">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label>Mood</label>
            <select [(ngModel)]="report.mood" name="mood" class="form-select">
              <option value="happy">Happy</option>
              <option value="calm">Calm</option>
              <option value="anxious">Anxious</option>
              <option value="agitated">Agitated</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label>Appetite</label>
            <select [(ngModel)]="report.appetite" name="appetite" class="form-select">
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3 mb-3">
            <label>Temp (°C)</label>
            <input type="number" step="0.1" [(ngModel)]="report.temperature" name="temp" class="form-control">
          </div>
          <div class="col-md-3 mb-3">
            <label>Pulse</label>
            <input type="number" [(ngModel)]="report.pulse" name="pulse" class="form-control">
          </div>
          <div class="col-md-3 mb-3">
            <label>Fluid Intake (ml)</label>
            <input type="number" [(ngModel)]="report.fluid_intake_ml" name="fluid" class="form-control">
          </div>
          <div class="col-md-3 mb-3">
            <label>Bowel Movement</label>
            <div class="form-check mt-2">
              <input type="checkbox" [(ngModel)]="report.bowel_movement" name="bowel" class="form-check-input">
              <label class="form-check-label">Opened?</label>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label>General Observations</label>
          <textarea [(ngModel)]="report.observations" name="obs" class="form-control" rows="3"></textarea>
        </div>

        <div class="d-flex gap-2">
          <button type="submit" class="btn btn-primary">Save Report</button>
          <button type="button" (click)="cancel()" class="btn btn-outline-secondary">Cancel</button>
        </div>
      </form>
    </div>
  `
})
export class HealthFormComponent implements OnInit {
  report: any = { mood: 'calm', appetite: 'good', bowel_movement: false };
  isEdit = false;

  constructor(private route: ActivatedRoute, private router: Router, private healthService: HealthService) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      this.report.date_recorded = new Date().toISOString();
    }
    
    if (id) {
      this.isEdit = true;
      this.healthService.get(id).subscribe(data => this.report = data);
    }
  }

  save() {
    const action = this.isEdit ? this.healthService.update(this.report.id, this.report) : this.healthService.create(this.report);
    action.subscribe(() => this.router.navigate(['/health']));
  }

  cancel() { this.router.navigate(['/health']); }
}