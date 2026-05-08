import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export type UserRole = 'admin' | 'manager' | 'senior_carer' | 'carer';

interface TokenPayload {
  user_id: number;
  username: string;
  full_name: string;
  role: UserRole;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }

  getUser(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<TokenPayload>(token);
    } catch {
      return null;
    }
  }

  getRole(): UserRole | null {
    return this.getUser()?.role || null;
  }

  getFullName(): string {
    return this.getUser()?.full_name || 'Staff';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isManagerOrAbove(): boolean {
    return ['admin', 'manager'].includes(this.getRole() || '');
  }

  isCarer(): boolean {
    return ['carer', 'senior_carer'].includes(this.getRole() || '');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('clock_in_time');
    localStorage.removeItem('dark_mode');
    this.router.navigate(['/login']);
  }
}