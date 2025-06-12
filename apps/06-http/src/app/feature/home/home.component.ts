import { Component, inject, OnDestroy } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { Observable } from 'rxjs';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'sfeir-home',
  template: `
  
    <section *ngIf="currentPeople$ | async as people">
        <mat-card class="mat-whiteframe-2dp">
            <mat-card-title-group>
                <img mat-card-image [ngSrc]="people.photo" height="128" width="128" priority alt="person-photo" />
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

    <button mat-fab color="accent" (click)="getRandomPerson()"><i class="material-icons">autorenew</i></button>
  
  `,
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnDestroy {

  private readonly peopleService = inject(PeopleService);
  protected peoples$: Observable<People[]> | undefined = this.peopleService.getPeoplesV2();
  protected currentPeople$: Observable<People> | undefined = this.peopleService.getRandomPeopleV2();
  protected getRandomPerson() {
    this.currentPeople$ = this.peopleService.getRandomPeople();
  }

  ngOnDestroy() {
    localStorage.clear();
  }
}