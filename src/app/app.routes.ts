import { Routes } from '@angular/router';

export const routes: Routes = [
  // 👇 Default route → go directly to feedback-analysis
  { path: '', redirectTo: 'feedback-dashboard', pathMatch: 'full' },

  // Login page
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },

  // Feedback Analysis page
  { path: 'feedback-analysis', loadComponent: () => import('./pages/feedback-analysis/feedback-analysis.component').then(m => m.FeedbackAnalysisComponent) },

  // Questionnaire page
  { path: 'questionnaire', loadComponent: () => import('./pages/questionnaire/questionnaire.component').then(m => m.QuestionnaireComponent) },

  { path: 'feedback-dashboard', loadComponent: () => import('./pages/feedback-dashboard/feedback-dashboard.component').then(m => m.FeedbackDashboardComponent) },

  { path: 'questionnaire-dashboard', loadComponent: () => import('./pages/questionnaire-dashboard/questionnaire-dashboard.component') .then(m => m.QuestionnaireDashboardComponent) }



];
