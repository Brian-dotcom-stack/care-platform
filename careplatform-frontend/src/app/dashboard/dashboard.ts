import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  stats = { staff: 0, clients: 0, visits: 0, incidents: 0 };
  todayShifts: any[] = [];
  recentActivity: any[] = [];
  staffStatus: any[] = [];
  loading = true;

  private api = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.api}/staff/`)
      .subscribe(d => {
        this.stats.staff = d.length;
        this.cdr.detectChanges();
      });

    this.http.get<any[]>(`${this.api}/clients/`)
      .subscribe(d => {
        this.stats.clients = d.length;
        this.cdr.detectChanges();
      });

    this.http.get<any[]>(`${this.api}/shifts/`)
      .subscribe(d => {
        const today = new Date().toISOString().split('T')[0];
        this.todayShifts = d.filter(s =>
          s.start_time?.startsWith(today)
        ).slice(0, 5);
        this.stats.visits = this.todayShifts.length;
        this.staffStatus = d.filter(s =>
          s.clocked_in_at && !s.clocked_out_at
        ).slice(0, 5);
        this.loading = false;
        this.cdr.detectChanges();
      });

    this.http.get<any[]>(`${this.api}/incidents/`)
      .subscribe(d => {
        const month = new Date().getMonth();
        this.stats.incidents = d.filter(i =>
          new Date(i.date_occurred).getMonth() === month
        ).length;
        this.recentActivity = d.slice(0, 4).map(i => ({
          title: 'Incident reported',
          desc: `${i.client_name} · ${i.incident_type}`,
          time: this.timeAgo(i.created_at)
        }));
        this.cdr.detectChanges();
      });
  }

  timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  getShiftStatus(shift: any): string {
    if (shift.clocked_out_at) return 'Completed';
    if (shift.clocked_in_at) return 'In progress';
    return 'Upcoming';
  }

  getShiftBadge(shift: any): string {
    if (shift.clocked_out_at) return 'badge-green';
    if (shift.clocked_in_at) return 'badge-amber';
    return 'badge-blue';
  }

  formatTime(dt: string): string {
    if (!dt) return '';
    return new Date(dt).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getFirstName(): string {
    return this.auth.getFullName().split(' ')[0];
  }

  getInitials(name: string): string {
    if (!name || name.trim() === '') return '?';
    return name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
  }
}
