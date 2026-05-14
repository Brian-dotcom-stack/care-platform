import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  email = ''; 
  error = '';
  logoError = false;

  handleLogoError() {
    this.logoError = true;
  }
  loading = false;
  showPassword = false;
  rememberMe = false;
  tab: 'signin' | 'create' = 'signin';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.loading = true;
    this.error = '';
    this.http.post<any>('http://localhost:8000/api/auth/login/', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Invalid username or password. Please try again.';
        this.loading = false;
      }
    });
  }

  register() {
    this.loading = true;
    this.error = '';
    // Add your registration API call here
    console.log('Registering:', this.username, this.email);
    setTimeout(() => { this.loading = false; }, 1000);
  }
}