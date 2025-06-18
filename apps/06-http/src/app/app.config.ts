import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, Routes, withComponentInputBinding, withRouterConfig } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: async () => (await import('./feature/home/home.component')).HomeComponent },
    { path: 'people', loadComponent: async () => (await import('./feature/people/people.component')).PeopleComponent },

    // ici on loadChildren pour le path 'people/:id' car cette feature pourrait évoluer et devenir plus grande. 
    // Du coup, ses routes 'enfants/filles' seront enregistrées dans le update-people.routing.ts
    { path: 'people/:id', loadChildren: async () => await import('./feature/people/update-people/update-people.routing') }

    // { path: '**', redirectTo: 'home' },
];

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        provideRouter(APP_ROUTES, withComponentInputBinding(), withRouterConfig({ onSameUrlNavigation: 'reload' })),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
}
