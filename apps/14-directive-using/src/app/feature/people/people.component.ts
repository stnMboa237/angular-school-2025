import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, shareReplay } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';

@Component({
  selector: 'sfeir-people',
  template: `
    <section>
      @for (person of people$ |async;track person.id) {
        <sfeir-card [person]="person" (personDelete)="deletePerson($event)" />
      }
    </section>
    <section>
      <mat-list>
        @for (person of people$ | async;track person.id) {
          <mat-list-item class="mat-whiteframe-2dp mat-card">
            <img alt="person-image" [ngSrc]="person.photo" matListItemAvatar height="40" width="40" />
            <h3 matListItemLine>{{ person.firstname }} {{ person.lastname }}</h3>
            <p matListItemLine>
              <span> {{ person.entity }} </span> — <span>{{ person.email }} </span>
            </p>
          </mat-list-item>
        }
      </mat-list>
    </section>

    <section class="buttons-fab">
      <button mat-fab color="warn">
        <i class="material-icons">list</i>
        <!-- <i class="material-icons">view_stream</i> -->
      </button>
    </section>

  `,
  styleUrls: ['./people.component.scss'],
  standalone: false,
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;

  constructor(private readonly peopleService: PeopleService) { }

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople().pipe(shareReplay(1));
  }

  deletePerson(person: People): void {
    this.people$ = this.peopleService.deletePeople(person.id).pipe(shareReplay(1));
  }
}
