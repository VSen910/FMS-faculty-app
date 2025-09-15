import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)},
  {path: 'home', loadComponent: () => import('./home/home').then(m => m.Home)},
  {path: 'create-form', loadComponent: () => import('./create-form/create-form').then(m => m.CreateForm)},
  {path: 'analytics/:id', loadComponent: () => import('./feedback-analytics/feedback-analytics').then(m => m.FeedbackAnalytics)}
];
