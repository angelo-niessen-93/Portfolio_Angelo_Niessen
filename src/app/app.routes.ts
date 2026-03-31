import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Legal } from './pages/legal/legal';
import { Privacy } from './pages/privacy/privacy';

export const routes: Routes = [
  { path: 'legal-notice', component: Legal },
  { path: 'privacy-policy', component: Privacy },
  { path: '', component: Home, pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
