import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dark_mode');
      if (saved === 'true') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    localStorage.setItem('dark_mode', String(this.isDarkMode));
  }

  getInitials(): string {
    const name = this.auth.getFullName();
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }
}

