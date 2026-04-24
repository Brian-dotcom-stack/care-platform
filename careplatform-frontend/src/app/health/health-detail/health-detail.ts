import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HealthService } from '../health.service';

@Component({
  selector: 'app-health-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './health-detail.html',
})
export class HealthDetailComponent implements OnInit {

  report: any;

  constructor(
    private route: ActivatedRoute,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.healthService.get(id).subscribe({
      next: (data) => this.report = data,
      error: (err) => console.error('Error loading report', err)
    });
  }
}