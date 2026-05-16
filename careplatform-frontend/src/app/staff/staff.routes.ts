import { Routes } from "@angular/router";
import { StaffListComponent } from "./staff-list/staff-list";
import { StaffDetailComponent } from "./staff-detail/staff-detail";
import { StaffFormComponent } from "./staff-form/staff-form";
import { managerGuard } from "../auth/auth.guard";

export const staffRoutes: Routes = [
  { path: '', component: StaffListComponent },
  { path: 'new', component: StaffFormComponent, canActivate: [managerGuard] },
  { path: ':id', component: StaffDetailComponent },
  { path: ':id/edit', component: StaffFormComponent, canActivate: [managerGuard] },
];
