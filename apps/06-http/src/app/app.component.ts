import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SharedImports } from './shared/imports/shared-imports';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  name = 'SWORD - LUXEMBOURG';
  private readonly router = inject(Router);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(e => this.router.navigateByUrl(e.url))
    )
    // .subscribe((e) => {
    //   // Code à exécuter à chaque fin de navigation, même sur même URL
    //   // this.router.navigateByUrl(e.url);
    // }
    // );
  }
}
