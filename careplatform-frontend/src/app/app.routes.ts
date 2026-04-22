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
    loadChildren: () =>
      import('./clients/clients.routes').then(m => m.clientRoutes)
  },
  { 
    path: 'rostering', 
    children: [
      { 
        path: '', 
        loadComponent: () => import('./rostering/rostering-list/rostering-list').then(m => m.RosteringListComponent) 
      },
      { 
        path: 'new', 
        loadComponent: () => import('./rostering/shift-form/shift-form').then(m => m.ShiftFormComponent) 
      }
    ]
  },
  {
    path: 'incidents',
    loadChildren: () =>
      import('./incidents/incidents.routes').then(m => m.incidentRoutes)
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