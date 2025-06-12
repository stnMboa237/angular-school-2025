import { Component } from '@angular/core';

@Component({
  selector: 'sfeir-app',
  template: `
      <!-- This component is an Angular Material Component, this is not important for the formation, to have more details on this component, please take take a look: https://material.angular.io/ -->
    <mat-toolbar class="extend-toolbar">
      <span>
        <a href="/home"> <img src="assets/images/logo-sword-white.png" aria-label="sword" alt="Sword" /> </a>
      </span>

      <span class="flex"></span>

      <span> 
        <a href="/locator">Maps</a>
        <a href="/people">List</a>
      </span>
    </mat-toolbar>

    <mat-card appearance="outlined"> {{ name }} </mat-card>
  `,
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  name = 'SWORD - LUXEMBOURG';
}
