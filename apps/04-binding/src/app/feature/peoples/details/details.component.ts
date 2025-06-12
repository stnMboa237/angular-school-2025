import { Component, inject } from "@angular/core";
import { PeopleService } from "../../../shared/services/people.service";
import { first, map, Observable, take, tap } from "rxjs";
import { People } from "../../../shared/models/people.model";

@Component({
    standalone: false,
    selector: 'people-details',
    template: `
        <section *ngIf="firstPeople$ | async as people">
            <mat-card class="mat-whiteframe-2dp">
                <mat-card-title-group>
                    <img mat-card-image [ngSrc]="people.photo" height="128" width="128" alt="person-photo" />
                    <mat-card-title>
                        <a [href]="'/people/'+people.id"> 
                            <span>{{ people.firstname | fullname: people.lastname}}</span>
                        </a>
                    </mat-card-title>
                    <mat-card-subtitle>{{people.entity}}</mat-card-subtitle>
                    <mat-card-subtitle class="contact-info">
                        <mat-icon>email</mat-icon>
                        <a [href]="'mailto:' + people.firstname | fullname: people.lastname + '&lt;'+people.email+'&gt;'" [title]="'Send an email to ' + people.firstname | fullname: people.lastname" class="truncate">{{people.email}}</a>
                    </mat-card-subtitle>
                    <mat-card-subtitle class="contact-info">
                        <mat-icon>phone</mat-icon>
                        <a [href]="'tel:' + people.phone" [title]="people.firstname | fullname: people.lastname">{{people.phone}}</a>
                    </mat-card-subtitle>
                </mat-card-title-group>
                <mat-card-content>
                <div class="contact-info">Manager <a href="/people/1">{{people.manager}}</a></div>
                <div class="contact-info">Location<a href="http://www.sfeir.com/contact/">{{people.address.city}}</a></div>
                <div class="buttons-info">
                    <a mat-button title="Locate" [href]="'/people/'+people.id">
                    <mat-icon>map</mat-icon>
                    </a>
                    <a mat-button title="Edit" [href]="'/people/'+people.id">
                    <mat-icon>create</mat-icon>
                    </a>
                    <a mat-button title="Delete">
                    <mat-icon>delete</mat-icon>
                    </a>
                </div>
                </mat-card-content>
            </mat-card>
        </section>
    `,
    styleUrls: ['./details.component.scss']
})

export class PeopleDetailComponent {

    private readonly peopleService = inject(PeopleService);

    protected firstPeople$: Observable<People> | undefined = this.peopleService.getpeoples().pipe(
        map(peoples => peoples[0])
    );

}