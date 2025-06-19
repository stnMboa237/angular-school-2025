import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SharedImports } from './shared/imports/shared-imports';
import { Router, RouterModule } from '@angular/router';
import { PeopleAppHeaderComponent } from "./core/components/people-app-header.component";

@Component({
  selector: 'sfeir-app',
  imports: [...SharedImports, RouterModule, PeopleAppHeaderComponent],
  template: `
    <!-- This component is an Angular Material Component, this is not important for the formation, to have more details on this component, please take take a look: https://material.angular.io/ -->
    <ng-template #header>
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
    </ng-template>
    
    <application-header [headerTemplate]="header"/>
    <router-outlet/>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  name = 'SWORD - LUXEMBOURG';
  private readonly router = inject(Router);
}
