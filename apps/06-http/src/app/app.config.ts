import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withComponentInputBinding, withRouterConfig } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./feature/home/home.component').then(c => c.HomeComponent) },
    { path: 'people', loadComponent: () => import('./feature/people/people.component').then(c => c.PeopleComponent) },
    { path: 'people/:id', loadComponent: () => import('./feature/people/update-people/update-people.component').then(c => c.UpdatePeopleComponent) },
    // { path: '**', redirectTo: 'home' },
];

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        provideRouter(APP_ROUTES, withComponentInputBinding(), withRouterConfig({ onSameUrlNavigation: 'reload' })),
        provideAnimations(),
        provideHttpClient()
    ]
}
