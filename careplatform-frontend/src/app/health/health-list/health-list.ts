import { Component, OnInit } from '@angular/core';
import { HealthService } from '../health.service';

// Angular standalone imports
import {
  NgFor,
  NgIf,
  NgClass,
  DatePipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-health-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    DatePipe,
    TitleCasePipe,
    UpperCasePipe
  ],
  templateUrl: './health-list.html',
  styleUrls: ['./health-list.scss']
})
export class HealthListComponent implements OnInit {

  reports: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  loading = true;
  error: string | null = null;

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.loading = true;
    this.error = null;

    this.healthService.getAll().subscribe({
      next: (data) => {
        this.reports = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load health reports.';
        this.loading = false;
      }
    });
  }

  filter() {
    const term = this.searchTerm.toLowerCase();

    this.filtered = this.reports.filter(report =>
      report.client_name.toLowerCase().includes(term)
    );
  }
}
