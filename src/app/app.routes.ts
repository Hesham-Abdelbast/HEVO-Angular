import { HevoColorFontComponent } from './shared/components/layout/hevo-color-font/hevo-color-font.component';
import { URLs } from './shared/helper/urls';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './shared/components/layout/hevo-color-font/hevo-color-font.component'
      ).then((m) => m.HevoColorFontComponent),
    children: [
      {
        path: URLs.LOGIN,
        loadComponent: () =>
          import('./pages/Auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: URLs.REGISTER,
        loadComponent: () =>
          import('./pages/Auth/registration/registration.component').then(
            (m) => m.RegistrationComponent
          ),
      },
      {
        path: URLs.HOME,
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./shared/components/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
];
