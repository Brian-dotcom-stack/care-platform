import { Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list';
import { ClientDetailComponent } from './client-detail/client-detail';
import { ClientFormComponent } from './client-form/client-form';

export const clientRoutes: Routes = [
  { path: '', component: ClientListComponent },
  { path: 'new', component: ClientFormComponent },
  { path: ':id', component: ClientDetailComponent },
  { path: ':id/edit', component: ClientFormComponent }
];