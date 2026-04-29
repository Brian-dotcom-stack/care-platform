import { Routes } from '@angular/router';
import { AbcListComponent } from './abc-list/abc-list';
import { AbcDetailComponent } from './abc-detail/abc-detail';
import { AbcFormComponent } from './abc-form/abc-form';

export const abcRoutes: Routes = [
  { path: '', component: AbcListComponent },
  { path: 'new', component: AbcFormComponent },
  { path: ':id', component: AbcDetailComponent },
  { path: ':id/edit', component: AbcFormComponent }
];