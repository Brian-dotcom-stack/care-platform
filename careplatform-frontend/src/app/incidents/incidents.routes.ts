import { Routes } from '@angular/router';
import { IncidentListComponent } from './incident-list/incident-list';
import { IncidentDetailComponent } from './incident-detail/incident-detail';
import { IncidentFormComponent } from './incident-form/incident-form';

export const incidentRoutes: Routes = [
  { path: '', component: IncidentListComponent },
  { path: 'new', component: IncidentFormComponent },
  { path: ':id', component: IncidentDetailComponent },
  { path: ':id/edit', component: IncidentFormComponent }
];