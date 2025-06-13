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
        @if(peoples$ | async; as peoples){
            <section>
                @for (people of peoples; track $index) {
                    <sfeir-card [peopleParam]="people" />
                }
            </section>
        }
        @else {
            <p> La récuperation de la liste des personnes a éhoué.</p>
        }
    `,
    styleUrls: ['./people.component.scss']
})

export class PeopleComponent {
    private readonly peopleService = inject(PeopleService);
    protected peoples$: Observable<People[]> | undefined = this.peopleService.getPeoples();

}