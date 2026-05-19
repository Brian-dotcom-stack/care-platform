import { VisitListComponent } from './visit-list/visit-list';
import { VisitDetailComponent } from './visit-detail/visit-detail';
import { VisitFormComponent } from './visit-form/visit-form';
import { Routes } from '@angular/router';

export const visitRoutes: Routes = [
  { path: '', component: VisitListComponent },
  { path: 'new', component: VisitFormComponent },
  { path: ':id', component: VisitDetailComponent },
  { path: ':id/edit', component: VisitFormComponent }
];
