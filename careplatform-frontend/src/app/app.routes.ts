import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'staff', pathMatch: 'full' },
    {
        path: 'staff',
        loadChildren: () => 
            import('./staff/staff.routes').then(m => m.staffRoutes)
    }
];
