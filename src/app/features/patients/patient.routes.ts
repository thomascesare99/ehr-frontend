import { Routes } from '@angular/router';

export const PATIENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/patient-list/patient-list')
        .then(m => m.PatientList)
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/patient-create/patient-create')
        .then(m => m.PatientCreate)
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/patient-detail/patient-detail')
        .then(m => m.PatientDetail)
  },
  {
    // NEW ROUTE: Reuses PatientCreate
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/patient-create/patient-create')
        .then(m => m.PatientCreate)
  },
  {
    path: ':id/hospitalizations',
    loadComponent: () => import('../hospitalizations/pages/hospitalization-list/hospitalization-list').then(m => m.HospitalizationList)
  }
];
