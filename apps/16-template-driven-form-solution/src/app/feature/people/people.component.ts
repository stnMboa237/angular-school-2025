import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, filter, Observable, shareReplay, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { People } from '../../shared/models/people.model';
import { AddPersonDialogComponent } from './components/add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'sfeir-people',
  template: `
    @if (view$ | async;as currentView) {
      @switch (currentView) {
        @case ('card') {
          <section data-testid="card-view">
            @for (person of people$ | async;track person.id) {
              <sfeir-card [person]="person" (personDelete)="deletePerson($event)" />
            }
          </section>
        }
        @case ('list') {
          <section data-testid="list-view">
            <mat-list>
              @for (person of people$ | async;track person.id) {
                <mat-list-item class="mat-whiteframe-2dp mat-card">
                  <img matListItemAvatar ngSrc="{{ person.photo }}" alt="photo-people" height="40" width="40" />
                  <h3 matListItemLine>
                    {{ person.firstname }} {{ person.lastname }}
                    <span class="sfeir-badge" [sfeirBadge]="person.isManager"></span>
                  </h3>
                  <p matListItemLine>
                    <span> {{ person.entity }} </span> — <span>{{ person.email }} </span>
                  </p>
                </mat-list-item>
              }
            </mat-list>
          </section>
        }
      }
      <section class="buttons-fab">
        <button mat-fab color="accent" class="button-add" (click)="showDialog()" data-testid="button-modal"><i class="material-icons">add</i></button>
        <button mat-fab color="warn" (click)="changeView(currentView)" name="change-view" data-testid="button-view">
          <i class="material-icons">{{ currentView === 'card' ? 'list' : 'view_stream' }}</i>
        </button>
      </section>
}
  
  `,
  styleUrls: ['./people.component.scss'],
  standalone: false,
})
export class PeopleComponent implements OnInit {
  people$: Observable<Array<People>> = EMPTY;
  view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

  constructor(
    private readonly peopleService: PeopleService,
    private readonly matDialogService: MatDialog,
  ) { }

  ngOnInit(): void {
    this.people$ = this.peopleService.getPeople().pipe(shareReplay(1));
  }

  deletePerson(person: People): void {
    this.people$ = this.peopleService.deletePeople(person.id).pipe(shareReplay(1));
  }

  changeView(currentView: string): void {
    this.view$.next(currentView === 'card' ? 'list' : 'card');
  }

  showDialog(): void {
    this.matDialogService
      .open(AddPersonDialogComponent, { width: '30%', height: 'fit-content' })
      .afterClosed()
      .pipe(
        filter(personForm => !!personForm),
        switchMap(personForm => this.peopleService.addNewPerson(personForm)),
        switchMap(() => {
          this.people$ = this.peopleService.getPeople().pipe(shareReplay(1));
          return this.people$;
        }),
      )
      .subscribe();
  }
}
