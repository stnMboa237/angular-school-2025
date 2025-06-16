import { Component, inject } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { map, Observable } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { SharedImports } from '../../shared/imports/shared-imports';
import { AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card.component';

@Component({
  selector: 'sfeir-home',
  imports: [...SharedImports, RouterModule, CardComponent, AsyncPipe],
  template: `
    @if(currentPeople$ | async; as people) {
      <section>
        <sfeir-card [peopleParam]="people" (personDeleteEvent)="getRandomPerson()"/>
      </section>
    } @else {
      <section>
        <h3>Pas de données</h3>
      </section>
    }
    <button mat-fab color="accent" (click)="getRandomPerson()"><i class="material-icons">autorenew</i></button>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  private readonly peopleService = inject(PeopleService);
  protected currentPeople$: Observable<People> = this.peopleService.getPeoples().pipe(
    // map(([firstPeron]) => firstPeron)
    map(peoples => {
      if (Array.isArray(peoples) && peoples.length > 0)
        return peoples[0];
      else
        return null;
    })
  );

  protected getRandomPerson() {
    this.currentPeople$ = this.peopleService.getRandomPeople();
  }
}