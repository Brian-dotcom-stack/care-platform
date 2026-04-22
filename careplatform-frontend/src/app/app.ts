import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { ClockWidgetComponent } from './staff/clock-widget/clock-widget';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  constructor(private router: Router) {}
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    // Clear the tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_role'); // If you are storing the role
    
    // Send the user back to the login page
    this.router.navigate(['/login']);
  }
}

