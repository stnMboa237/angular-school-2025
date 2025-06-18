import { Component, inject } from "@angular/core";
import { SharedImports } from "../../../shared/imports/shared-imports";
import { map, Observable } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PeopleService } from "../../../core/services/people.service";
import { People, PeopleForm } from "../../../shared/models/people.model";
import { Location } from "@angular/common";
import { PeopleReactiveFormComponent } from "../../../shared/components/Form/reactive-form/people-form-reactive.component";

@Component({
    selector: 'people-update',
    imports: [...SharedImports, PeopleReactiveFormComponent],
    template: `
        <section>
            @if(people$ | async; as people) {
                <!-- template-driven-form -->
                <!-- <people-form [people]="people" (save)="UpdatePeople($event)" (cancel)="goBack()"/> -->

                <!-- reactive-form -->
                <people-reactive-form [people]="people" (save)="UpdatePeople($event)" (cancel)="goBack()"/>
            }
        </section>
    `,
    styleUrls: ['./update-people.component.scss']
})

export class UpdatePeopleComponent {

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly peopleService = inject(PeopleService);
    private readonly location = inject(Location);

    // recuperation de la personne sans PersonDetailsResolver
    // protected people$: Observable<People> = this.activatedRoute.paramMap.pipe(
    //     map(paramMap => paramMap.get('id')),
    //     filter(id => !!id),
    //     switchMap(id => this.peopleService.getPeopleById(id)),
    // );

    // recuperation de la personne via PersonDetailsResolver.
    protected people$: Observable<People> = this.activatedRoute.data.pipe(
        map(({ personDetails }) => personDetails));

    UpdatePeople(peopleToUpdate: PeopleForm) {
        this.peopleService.updatePeople(peopleToUpdate).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}