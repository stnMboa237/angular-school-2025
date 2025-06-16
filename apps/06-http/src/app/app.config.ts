import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withComponentInputBinding, withRouterConfig } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./feature/home/home.component').then(c => c.HomeComponent) },
    { path: 'people', loadComponent: () => import('./feature/people/people.component').then(c => c.PeopleComponent) },
    // { path: '**', redirectTo: 'home' },
];

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES, withComponentInputBinding(), withRouterConfig({ onSameUrlNavigation: 'reload' })),
        provideAnimations(),
        provideHttpClient()
    ]
}
