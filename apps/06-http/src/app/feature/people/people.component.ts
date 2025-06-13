import { Component, inject } from "@angular/core";
import { SharedImports } from "../../shared/imports/shared-imports";
import { People } from "../../shared/models/people.model";
import { Observable } from "rxjs";
import { PeopleService } from "../../services/people.service";
import { RouterModule } from "@angular/router";
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { FullNamePipe } from "../../shared/pipes/fullname.pipe";

@Component({
    selector: 'sfeir-people',
    imports: [...SharedImports, RouterModule, AsyncPipe, NgOptimizedImage, FullNamePipe],
    template: `
        @if(peoples$ | async; as peoples){
            <section>
                @for (people of peoples; track $index) {
                    <mat-card class="mat-whiteframe-2dp">
                        <mat-card-title-group>
                            <img mat-card-image [ngSrc]="people.photo" height="128" width="128" priority alt="person-photo" />
                            <mat-card-title>
                                <a [routerLink]="'people/'+people.id"> 
                                    <span>{{ people.firstname | fullname: people.lastname}}</span>
                                </a>
                            </mat-card-title>
                            <mat-card-subtitle>{{people.entity}}</mat-card-subtitle>
                            <mat-card-subtitle class="contact-info">
                                <mat-icon>email</mat-icon>
                                <a class="truncate" [href]="'mailto:' 
                                    + people.firstname | fullname: people.lastname 
                                    + '&lt;'+people.email+'&gt;'" [title]="'Send an email to ' 
                                    + people.firstname | fullname: people.lastname" >{{people.email}}</a>
                            </mat-card-subtitle>
                            <mat-card-subtitle class="contact-info">
                                <mat-icon>phone</mat-icon>
                                <a [href]="'tel:' + people.phone" [title]="people.firstname | fullname: people.lastname">{{people.phone}}</a>
                            </mat-card-subtitle>
                        </mat-card-title-group>

                        <mat-card-content>
                            <div class="contact-info">Manager <a routerlink="/people/1">{{people.manager}}</a></div>
                            <div class="contact-info">Location<a href="http://www.sfeir.com/contact/">{{people.address.city}}</a></div>
                            <div class="buttons-info">
                                <a mat-button title="Locate" [routerLink]="'/people/'+people.id">
                                <mat-icon>map</mat-icon>
                                </a>
                                <a mat-button title="Edit" [routerLink]="'/people/'+people.id">
                                <mat-icon>create</mat-icon>
                                </a>
                                <a mat-button title="Delete">
                                <mat-icon>delete</mat-icon>
                                </a>
                            </div>
                        </mat-card-content>
                    </mat-card>
                }
                <!-- <mat-card class="mat-whiteframe-2dp" *ngFor="let people of peoples">
                    <mat-card-title-group>
                        <img mat-card-image [ngSrc]="people.photo" height="128" width="128" priority alt="person-photo" />
                        <mat-card-title>
                            <a [routerLink]="'people/'+people.id"> 
                                <span>{{ people.firstname | fullname: people.lastname}}</span>
                            </a>
                        </mat-card-title>
                        <mat-card-subtitle>{{people.entity}}</mat-card-subtitle>
                        <mat-card-subtitle class="contact-info">
                            <mat-icon>email</mat-icon>
                            <a class="truncate" [href]="'mailto:' 
                                + people.firstname | fullname: people.lastname 
                                + '&lt;'+people.email+'&gt;'" [title]="'Send an email to ' 
                                + people.firstname | fullname: people.lastname" >{{people.email}}</a>
                        </mat-card-subtitle>
                        <mat-card-subtitle class="contact-info">
                            <mat-icon>phone</mat-icon>
                            <a [href]="'tel:' + people.phone" [title]="people.firstname | fullname: people.lastname">{{people.phone}}</a>
                        </mat-card-subtitle>
                    </mat-card-title-group>
                    <mat-card-content>
                    <div class="contact-info">Manager <a routerlink="/people/1">{{people.manager}}</a></div>
                    <div class="contact-info">Location<a href="http://www.sfeir.com/contact/">{{people.address.city}}</a></div>
                    <div class="buttons-info">
                        <a mat-button title="Locate" [routerLink]="'/people/'+people.id">
                        <mat-icon>map</mat-icon>
                        </a>
                        <a mat-button title="Edit" [routerLink]="'/people/'+people.id">
                        <mat-icon>create</mat-icon>
                        </a>
                        <a mat-button title="Delete">
                        <mat-icon>delete</mat-icon>
                        </a>
                    </div>
                    </mat-card-content>
                </mat-card> -->
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
    protected peoples$: Observable<People[]> | undefined = this.peopleService.getPeoplesV2();

}