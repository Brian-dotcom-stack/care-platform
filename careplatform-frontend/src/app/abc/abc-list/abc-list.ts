import { Component, OnInit } from '@angular/core';
import { AbcService } from '../abc.service';

// Angular standalone imports
import {
  NgFor,
  NgIf,
  NgClass,
  UpperCasePipe,
  TitleCasePipe,
  DatePipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-abc-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './abc-list.html',
  styleUrls: ['./abc-list.scss']
})
export class AbcListComponent implements OnInit {

  charts: any[] = [];
  filtered: any[] = [];
  searchTerm = '';
  loading = true;
  error: string | null = null;

  constructor(private abcService: AbcService) {}

  ngOnInit() {
    this.loadCharts();
  }

  loadCharts() {
    this.loading = true;
    this.error = null;

    this.abcService.getAll().subscribe({
      next: (data) => {
        this.charts = data;
        this.filtered = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load ABC charts.';
        this.loading = false;
      }
    });
  }

  filter() {
    const term = this.searchTerm.toLowerCase();

    this.filtered = this.charts.filter(chart =>
      chart.client_name.toLowerCase().includes(term) ||
      chart.behaviour_type.toLowerCase().includes(term)
    );
  }

  getIntensityBorder(level: string) {
    return {
      'border-severe': level === 'severe',
      'border-moderate': level === 'moderate',
      'border-mild': level === 'mild'
    };
  }
}
