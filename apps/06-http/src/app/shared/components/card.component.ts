import { Component, Input, Output, EventEmitter } from "@angular/core";
import { SharedImports } from "../imports/shared-imports";
import { RouterModule } from "@angular/router";
import { NgOptimizedImage } from "@angular/common";
import { FullNamePipe } from "../pipes/fullname.pipe";
import { People } from "../models/people.model";
import { NAPipe } from "../pipes/na.pipe";

@Component({
    selector: 'sfeir-card',
    imports: [...SharedImports, RouterModule, NgOptimizedImage, FullNamePipe, NAPipe],
    template: `
        <mat-card class="mat-whiteframe-2dp">
            <mat-card-title-group>
                <img mat-card-image [ngSrc]="peopleParam.photo" height="128" width="128" priority alt="person-photo" />
                <mat-card-title>
                    <a [routerLink]="'/people/'+peopleParam.id"> 
                        <span>{{ peopleParam.firstname | fullname: peopleParam.lastname}}</span>
                    </a>
                </mat-card-title>
                <mat-card-subtitle>{{peopleParam.entity}}</mat-card-subtitle>
                <mat-card-subtitle class="contact-info">
                    <mat-icon>email</mat-icon>
                    <a [href]="'mailto:' + peopleParam.firstname | fullname: peopleParam.lastname + '&lt;'+peopleParam.email+'&gt;'" [title]="'Send an email to ' + peopleParam.firstname | fullname: peopleParam.lastname" class="truncate">{{peopleParam.email}}</a>
                </mat-card-subtitle>
                <mat-card-subtitle class="contact-info">
                    <mat-icon>phone</mat-icon>
                    <a [href]="'tel:' + peopleParam.phone" [title]="peopleParam.firstname | fullname: peopleParam.lastname">{{peopleParam.phone}}</a>
                </mat-card-subtitle>
            </mat-card-title-group>
            <mat-card-content>
            <div class="contact-info">Manager <a routerlink="/people/1"> {{peopleParam.manager | na }}</a></div>
            <div class="contact-info">Location<a href="https://www.sword-group.com/fr/luxembourg"> {{peopleParam.address.city}}</a></div>
            <div class="contact-info">birthDate<a href="birthDate"> {{ peopleParam.birthDate | date }}</a></div>
            <div class="buttons-info">
                <a mat-button title="Locate" [routerLink]="'/people/'+peopleParam.id">
                  <mat-icon>map</mat-icon>
                </a>
                <a mat-button title="Edit" [routerLink]="'/people/'+peopleParam.id">
                  <mat-icon>create</mat-icon>
                </a>
                <a mat-button title="Delete" (click)="personDelete(peopleParam.id)">
                  <mat-icon>delete</mat-icon>
                </a>
            </div>
            </mat-card-content>
        </mat-card>
    `,
    styleUrls: ['./card.component.scss']
})
export class CardComponent {

    @Input() peopleParam: People;
    @Output() personDeleteEvent = new EventEmitter<string>();

    protected personDelete(id: string) {
        this.personDeleteEvent.emit(id);
    }
}