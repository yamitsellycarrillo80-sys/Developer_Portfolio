import { Routes } from '@angular/router';

import { languageGuard } from './core/guards/language.guard';
import { DEFAULT_LANGUAGE } from './domain/models/language.model';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: DEFAULT_LANGUAGE },
  {
    path: ':lang',
    canActivate: [languageGuard],
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'pages.home',
        loadComponent: () => import('./features/home/home').then((m) => m.Home),
      },
      {
        path: 'about',
        title: 'pages.about',
        loadComponent: () => import('./features/about/about').then((m) => m.About),
      },
      {
        path: 'projects',
        title: 'pages.projects',
        loadComponent: () => import('./features/projects/projects').then((m) => m.Projects),
      },
      {
        path: 'skills',
        title: 'pages.skills',
        loadComponent: () => import('./features/skills/skills').then((m) => m.Skills),
      },
      {
        path: 'contact',
        title: 'pages.contact',
        loadComponent: () => import('./features/contact/contact').then((m) => m.Contact),
      },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: DEFAULT_LANGUAGE },
];
