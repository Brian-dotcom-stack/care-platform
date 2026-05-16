import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Shift {
  id: number;
  staff_name: string;
  client_name: string;
  start_time: string;
  end_time: string;
  shift_type: string;
  status: string;
  clocked_in_at: string | null;
  clocked_out_at: string | null;
  hours_worked: number | null;
  clocked_in_late: boolean;
  staff: number;
}

@Component({
  selector: 'app-rostering-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rostering-list.html',
  styleUrl: './rostering-list.scss'
})
export class RosteringListComponent implements OnInit {
  shifts: Shift[] = [];
  myShifts: Shift[] = [];
  loading = true;
  error = '';
  currentUserId: number = 0;
  clockingShiftId: number | null = null;

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadShifts();
  }

  loadShifts() {
    this.http.get<Shift[]>(`${this.api}/shifts/`).subscribe({
      next: (data) => {
        this.shifts = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Could not load shifts. Status: ' + err.status;
        this.loading = false;
        this.cdr.detectChanges();
      }
    });

    this.http.get<Shift[]>(`${this.api}/shifts/my_shifts/`).subscribe({
      next: (data) => {
        this.myShifts = [...data];
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  clockIn(shiftId: number) {
    this.clockingShiftId = shiftId;
    this.http.post<Shift>(`${this.api}/shifts/${shiftId}/clock_in/`, {}).subscribe({
      next: (updated) => {
        const index = this.shifts.findIndex(s => s.id === shiftId);
        if (index !== -1) this.shifts[index] = updated;
        const myIndex = this.myShifts.findIndex(s => s.id === shiftId);
        if (myIndex !== -1) this.myShifts[myIndex] = updated;
        this.clockingShiftId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.clockingShiftId = null;
        this.cdr.detectChanges();
      }
    });
  }

  clockOut(shiftId: number) {
    this.clockingShiftId = shiftId;
    this.http.post<Shift>(`${this.api}/shifts/${shiftId}/clock_out/`, {}).subscribe({
      next: (updated) => {
        const index = this.shifts.findIndex(s => s.id === shiftId);
        if (index !== -1) this.shifts[index] = updated;
        const myIndex = this.myShifts.findIndex(s => s.id === shiftId);
        if (myIndex !== -1) this.myShifts[myIndex] = updated;
        this.clockingShiftId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.clockingShiftId = null;
        this.cdr.detectChanges();
      }
    });
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      scheduled:   'badge-blue',
      in_progress: 'badge-amber',
      completed:   'badge-green',
      missed:      'badge-red',
    };
    return map[status] || 'badge-gray';
  }

  formatTime(dt: string | null): string {
    if (!dt) return '—';
    return new Date(dt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  }
}
