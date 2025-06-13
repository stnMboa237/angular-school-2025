import { Component } from '@angular/core';
import { SharedImports } from './shared/imports/shared-imports';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sfeir-app',
  standalone: true,
  imports: [...SharedImports, RouterModule],
  template: `
    <!-- This component is an Angular Material Component, this is not important for the formation, to have more details on this component, please take take a look: https://material.angular.io/ -->
    <mat-toolbar class="extend-toolbar">
      <span>
        <a routerLink='home'> <img src="./assets/images/medium_Logo_Sword_white.png" aria-label="sfeir" alt="Sfeir" /> </a>
      </span>

      <span class="flex"></span>
      <span> 
        <a routerLink='locator'>Maps</a>
        <a routerLink='people'>List</a>
      </span>
    </mat-toolbar>

    <router-outlet/>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'SFEIR - LUXEMBOURG';
}
