import { Component, inject } from "@angular/core";
import { SharedImports } from "../../../shared/imports/shared-imports";
import { FormComponent } from "../../../shared/components/Form/form.component";
import { filter, map, Observable, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { PeopleService } from "../../../core/services/people.service";
import { People, PeopleForm } from "../../../shared/models/people.model";
import { Location } from "@angular/common";

@Component({
    selector: 'people-update',
    imports: [...SharedImports, FormComponent],
    template: `
        <section>
            @if(people$ | async; as people) {
            <people-form [people]="people" (save)="UpdatePeople($event)" (cancel)="goBack()"/>
        }
        </section>
    `,
    styleUrls: ['./update-people.component.scss']
})

export class UpdatePeopleComponent {

    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly peopleService = inject(PeopleService);
    private readonly location = inject(Location);

    protected people$: Observable<People> = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        filter(id => !!id),
        switchMap(id => this.peopleService.getPeopleById(id)),
    );

    UpdatePeople(peopleToUpdate: PeopleForm) {
        this.peopleService.updatePeople(peopleToUpdate).subscribe(() => this.goBack());
    }

    goBack(): void {
        this.location.back();
    }
}