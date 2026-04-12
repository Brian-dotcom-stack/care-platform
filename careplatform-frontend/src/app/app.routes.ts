import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'staff',
        loadChildren: () => import('./staff/staff.routes').then(m => m.staffRoutes)
    }
];
