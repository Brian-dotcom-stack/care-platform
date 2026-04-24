import { Routes } from '@angular/router';
import { HealthListComponent } from './health-list/health-list';
import { HealthDetailComponent } from './health-detail/health-detail';
import { HealthFormComponent } from './health-form/health-form';

export const healthRoutes: Routes = [
  { path: '', component: HealthListComponent },
  { path: 'new', component: HealthFormComponent },
  { path: ':id', component: HealthDetailComponent },
  { path: ':id/edit', component: HealthFormComponent }
];