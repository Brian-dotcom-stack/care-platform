import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'CareConnect';

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'grid' },
    { label: 'Staff', path: '/staff', icon: 'people' },
    { label: 'Clients', path: '/clients', icon: 'groups' },
    { label: 'Rostering', path: '/roster', icon: 'calendar' },
    { label: 'Incidents', path: '/incidents', icon: 'warning' },
    { label: 'Health Reports', path: '/health', icon: 'heart' },
    { label: 'ABC charts', path: '/abc', icon: 'chart' },
  ];
}
