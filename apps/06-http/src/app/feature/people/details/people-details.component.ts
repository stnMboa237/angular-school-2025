import { Component, inject } from "@angular/core";
import { PeopleService } from '../../../core/services/people.service';
import { SharedImports } from "../../../shared/imports/shared-imports";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, switchMap } from "rxjs";
import { People } from "../../../shared/models/people.model";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'people-details',
    template: `
        @if(people$ | async; as p) {
            <p>{{p.firstname}} {{p.lastname}}</p>
        }
    
    `,
    styleUrls: ['./people-details.component.scss'],
    imports: [...SharedImports, AsyncPipe]
})

export class PeopleDetailsComponent {

    private readonly routes = inject(ActivatedRoute);
    protected people$: Observable<People> = this.routes.paramMap.pipe(
        map(paramMap => paramMap.get('id')),
        switchMap((routeId) => {
            if (!routeId)
                return null;
            return this.peopleService.getPeopleById(routeId);
        })
    );;

    constructor(private readonly peopleService: PeopleService, routes: ActivatedRoute) { }

}