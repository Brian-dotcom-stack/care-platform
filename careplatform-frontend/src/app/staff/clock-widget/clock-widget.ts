import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffService } from '../staff';

@Component({
  selector: 'app-clock-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clock-widget.html',
  styleUrl: './clock-widget.scss',
})
export class ClockWidgetComponent implements OnInit {
  isClockedIn = false;
  clockInTime: string | null = null;
  loading = false;
  message = '';

  constructor(private staffService: StaffService) {}

  ngOnInit() {
    const saved = localStorage.getItem('clock_in_time');
    if (saved) {
      this.isClockedIn = true;
      this.clockInTime = saved;
    }
  }

  clockIn () {
    this.loading = true;
    this.staffService.clockIn().subscribe({
      next: (record) => {
        this.isClockedIn = true;
        this.clockInTime = record.clock_in;
        localStorage.setItem('clock_in_time', record.clock_in);
        this.message = 'Clocked in successfully.';
        this.loading = false;
      },
      error: () => {
        this.message = 'Could not clock in. Try again.';
        this.loading = false;
      }
    });
  }

  clockOut() {
    this.loading = true;
    this.staffService.clockOut().subscribe({
      next: () => {
        this.isClockedIn = false;
        this.clockInTime = null;
        localStorage.removeItem('clock_in_time');
        this.message = 'Clocked out successfully.';
        this.loading = false;
      },
      error: () => {
        this.message = 'Could not clock out. Try again.';
        this.loading = false;
      }
    });
  }
}
