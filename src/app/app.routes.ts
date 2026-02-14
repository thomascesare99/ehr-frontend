import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patients',
    loadChildren: () =>
      import('./features/patients/patient.routes')
        .then(m => m.PATIENTS_ROUTES)
  },
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full'
  }
];
