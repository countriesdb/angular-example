import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadComponent: () => import('./countries/countries.component').then(m => m.CountriesComponent)
  },
  {
    path: 'subdivisions',
    loadComponent: () => import('./subdivisions/subdivisions.component').then(m => m.SubdivisionsComponent)
  }
];
