import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dark_mode');
      if (saved === 'true') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      }
    }
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('dark_mode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('dark_mode', 'false');
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('clock_in_time');
    this.router.navigate(['/login']);
  }

  getInitials(): string {
    return 'BM';
  }
}