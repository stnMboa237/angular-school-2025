import { Component, inject } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { Observable } from 'rxjs';
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
        <sfeir-card [peopleParam]="people" />
      </section>
    }
    <button mat-fab color="accent" (click)="getRandomPerson()"><i class="material-icons">autorenew</i></button>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private readonly peopleService = inject(PeopleService);
  protected peoples$: Observable<People[]> | undefined = this.peopleService.getPeoples();
  protected currentPeople$: Observable<People> | undefined = this.peopleService.getRandomPeople();
  protected getRandomPerson() {
    this.currentPeople$ = this.peopleService.getRandomPeople();
  }
}