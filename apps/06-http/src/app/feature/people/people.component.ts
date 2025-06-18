import { Component, inject } from "@angular/core";
import { SharedImports } from "../../shared/imports/shared-imports";
import { BehaviorSubject, filter, Observable, shareReplay, switchMap, } from "rxjs";
import { PeopleService } from "../../core/services/people.service";
import { RouterModule } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { CardComponent } from "../../shared/components/people-card/card.component";
import { FullNamePipe } from "../../shared/pipes/fullname.pipe";
import { BadgeDirective } from "../../shared/directives/badge.directive";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddPersonDialogComponent } from "../../shared/components/people-dialog/add-person-dialog.component";
import { People, PeopleForm } from "../../shared/models/people.model";

@Component({
    selector: 'sfeir-people',
    imports: [...SharedImports, RouterModule, AsyncPipe, CardComponent, FullNamePipe, BadgeDirective, MatDialogModule],
    template: `
    @if(view$ | async; as currentView) {
        @switch (currentView) {
            @case ('card') {
                <section data-testid="card-view">
                    @for(people of peoples$ | async; track people.id) {
                        <sfeir-card [peopleParam]="people" (personDeleteEvent)="deletePeople($event)"></sfeir-card>
                    }
                </section>
            }

            @case ('list') {
                <section data-testid="list-view">
                    <mat-list>
                        @for(people of peoples$ | async; track people.id) {
                            <mat-list-item class="mat-whiteframe-2dp mat-card">
                                <img matListItemAvatar [ngSrc]="people.photo" alt="photo-people" height="40" width="40" />
                                <h3 matListItemTitle>
                                    {{ people.firstname | fullname: people.lastname }}  
                                    <span class="sfeir-badge" [sfeirBadge]="people.isManager"></span>
                                </h3>
                                
                                <p matListItemLine>
                                    <span> {{ people.entity }} </span> — <span>{{ people.email }} </span>
                                </p>
                            </mat-list-item>
                        }
                    </mat-list>
                </section>
            }
        }

        <section class="buttons-fab">
            <button mat-fab color="accent" class="button-add" (click)="showDialog()" data-testid="button-modal">
                <i class="material-icons">add</i>
            </button>
            <button mat-fab color="warn" (click)="changeView(currentView)" name="change-view" data-testid="button-view">
                <i class="material-icons">{{ currentView === 'card' ? 'list' : 'view_stream' }}</i>
            </button>
        </section>
    }   
    `,
    styleUrls: ['./people.component.scss'],
})

export class PeopleComponent {
    private readonly peopleService = inject(PeopleService);
    protected peoples$: Observable<Array<People>> = this.peopleService.getPeoples().pipe(shareReplay(1));
    protected view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');
    private readonly matDialogService = inject(MatDialog);

    showDialog(): void {
        this.matDialogService
            .open(AddPersonDialogComponent, { width: '30%', height: 'fit-content' })
            .afterClosed()
            .pipe(
                filter(peopleForm => !!peopleForm),
                switchMap((peopleForm: PeopleForm) => this.peopleService.AddNewPerson(peopleForm)), // création de la personne
                switchMap(() => {
                    this.peoples$ = this.peopleService.getPeoples().pipe(shareReplay(1)); // on récupère la nouvelle liste des personnes
                    return this.peoples$;
                }),
            ).subscribe(); // il faut subscribe afin que les peoples$ soit mis à jour
    }

    deletePeople(id: string) {
        this.peoples$ = this.peopleService.deletePeople(id).pipe(shareReplay(1));
    }

    changeView(currentView: string) {
        this.view$.next(currentView === 'card' ? 'list' : 'card');
    }
}