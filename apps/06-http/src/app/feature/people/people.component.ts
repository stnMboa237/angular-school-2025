import { Component, inject } from "@angular/core";
import { SharedImports } from "../../shared/imports/shared-imports";
import { People } from "../../shared/models/people.model";
import { Observable } from "rxjs";
import { PeopleService } from "../../services/people.service";
import { RouterModule } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { CardComponent } from "../../shared/components/card.component";

@Component({
    selector: 'sfeir-people',
    imports: [...SharedImports, RouterModule, AsyncPipe, CardComponent],
    template: `
    <section>
        @if(peoples$ | async; as peoples){
            @for (people of peoples; track $index) {
                <sfeir-card [peopleParam]="people" (personDeleteEvent)="deletePeople($event)" />
            }
        }@else {
        <h2> La liste des personnes est vide</h2>    
        }
        <!-- <ng-container *ngIf="peoples$ | async as peoples; else emptyList">
            @if(peoples !== null && peoples.length !== 0){
                @for (people of peoples; track $index) {
                    <sfeir-card [peopleParam]="people" (personDeleteEvent)="deletePeople($event)" />
                }
            }
        </ng-container>
        
        <ng-template #emptyList>
            <h2> La liste des personnes est vide</h2>
        </ng-template> -->
    </section>
        
    `,
    styleUrls: ['./people.component.scss'],
})

export class PeopleComponent {

    private readonly peopleService = inject(PeopleService);
    protected peoples$: Observable<People[]> = this.peopleService.getPeoples();

    deletePeople(id: string) {
        this.peoples$ = this.peopleService.deletePeople(id);
    }
}