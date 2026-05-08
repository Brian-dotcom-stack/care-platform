import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard, managerGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'staff',
    canActivate: [authGuard],
    loadChildren: () => import('./staff/staff.routes').then(m => m.staffRoutes)
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadChildren: () => import('./clients/clients.routes').then(m => m.clientRoutes)
  },
  {
    path: 'rostering',
    canActivate: [authGuard],
    loadComponent: () => import('./rostering/rostering-list/rostering-list').then(m => m.RosteringListComponent)
  },
  {
    path: 'incidents',
    canActivate: [authGuard],
    loadChildren: () => import('./incidents/incidents.routes').then(m => m.incidentRoutes)
  },
  {
    path: 'health',
    canActivate: [authGuard],
    loadChildren: () => import('./health/health.routes').then(m => m.healthRoutes)
  },
  {
    path: 'abc',
    canActivate: [authGuard],
    loadChildren: () => import('./abc/abc.routes').then(m => m.abcRoutes)
  }
];