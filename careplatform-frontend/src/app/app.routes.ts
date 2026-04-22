import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.routes').then(m => m.staffRoutes)
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./incidents/incident-list/incident-list').then(m => m.IncidentListComponent)
  },
  {
    path: 'roster',
    loadComponent: () =>
      import('./incidents/incident-list/incident-list').then(m => m.IncidentListComponent)
  },
  {
    path: 'incidents',
    loadComponent: () =>
      import('./incidents/incident-list/incident-list').then(m => m.IncidentListComponent)
  },
  {
    path: 'health',
    loadComponent: () =>
      import('./health/health-list/health-list').then(m => m.HealthListComponent)
  },
  {
    path: 'abc',
    loadComponent: () =>
      import('./abc/abc-list/abc-list').then(m => m.AbcListComponent)
  }
];