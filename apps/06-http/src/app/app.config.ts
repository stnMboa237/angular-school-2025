import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./feature/home/home.component').then(x => x.HomeComponent) },
    // {path: 'people', loadComponent: () => import()},
    // {path: 'people/:id', loadComponent: () => import()},
    { path: '**', redirectTo: 'home' },
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES, withComponentInputBinding()),
        provideAnimations(),
        provideHttpClient()
    ]
}
