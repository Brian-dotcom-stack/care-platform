import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  // Redirect root → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login route (unguarded)
  { path: 'login', component: LoginComponent },

  // Protected routes
  {
    path: 'staff',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./staff/staff.routes').then(m => m.staffRoutes)
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./clients/clients.routes').then(m => m.clientRoutes)
  },
  { 
    path: 'rostering',
    canActivate: [authGuard],
    children: [
      { 
        path: '',
        loadComponent: () =>
          import('./rostering/rostering-list/rostering-list')
            .then(m => m.RosteringListComponent)
      },
      { 
        path: 'new',
        loadComponent: () =>
          import('./rostering/shift-form/shift-form')
            .then(m => m.ShiftFormComponent)
      }
    ]
  },
  {
    path: 'incidents',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./incidents/incidents.routes').then(m => m.incidentRoutes)
  },
  {
    path: 'health',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./health/health.routes').then(m => m.healthRoutes)
  },
  {
    path: 'abc',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./abc/abc.routes').then(m => m.abcRoutes)
  }
];
