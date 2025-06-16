import { Component, inject } from "@angular/core";
import { SharedImports } from "../../shared/imports/shared-imports";
import { BehaviorSubject, shareReplay, } from "rxjs";
import { PeopleService } from "../../services/people.service";
import { RouterModule } from "@angular/router";
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { CardComponent } from "../../shared/components/card.component";
import { FullNamePipe } from "../../shared/pipes/fullname.pipe";
import { BadgeDirective } from "../../shared/directives/badge.directive";

@Component({
    selector: 'sfeir-people',
    imports: [...SharedImports, RouterModule, AsyncPipe, CardComponent, FullNamePipe, NgOptimizedImage, BadgeDirective],
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
                                <img matListItemAvatar [ngSrc]="people.photo" alt="photo-people" height="40" width="40" priority=""/>
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
            <button mat-fab color="warn" (click)="changeView(currentView)" name="change-view">
            <i class="material-icons">{{ currentView === 'card' ? 'list' : 'view_stream' }}</i>
            </button>
        </section>
    }   
    `,
    styleUrls: ['./people.component.scss'],
})

export class PeopleComponent {

    private readonly peopleService = inject(PeopleService);
    protected peoples$ = this.peopleService.getPeoples().pipe(shareReplay(1));
    protected view$: BehaviorSubject<'card' | 'list'> = new BehaviorSubject('card');

    deletePeople(id: string) {
        this.peoples$ = this.peopleService.deletePeople(id).pipe(shareReplay(1));
    }

    changeView(currentView: string) {
        this.view$.next(currentView === 'card' ? 'list' : 'card');
    }
}