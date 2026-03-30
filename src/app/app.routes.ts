import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Legal } from './pages/legal/legal';

export const routes: Routes = [
  { path: 'legal-notice', component: Legal },
  { path: 'privacy-policy', redirectTo: 'legal-notice', pathMatch: 'full' },
  { path: '', component: Home, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
