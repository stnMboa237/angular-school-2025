import { Component, EventEmitter, Output } from '@angular/core';
import { PeopleForm } from '../../models/people.model';

@Component({
  selector: 'sfeir-form',
  template: `
  <form #personForm="ngForm" (ngSubmit)="onSave(personForm.value)" data-testid="person-form">
    <section class="form-container">
      <section class="form-container__image">
        <img width="100" height="100" ngSrc="https://randomuser.me/api/portraits/lego/6.jpg" alt="person-photo"/>
        <input type="hidden" name="photo" ngModel="https://randomuser.me/api/portraits/lego/6.jpg"/>
      </section>
      <section>
        <mat-form-field appearance="outline">
          <mat-label>First name</mat-label>
          <input type="text" matInput placeholder="First name" name="firstname" ngModel/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Last name</mat-label>
          <input type="text" matInput placeholder="Last name" name="lastname" ngModel/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input type="email" matInput placeholder="email" name="email" ngModel/>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>phone</mat-label>
          <input type="phone" matInput placeholder="phone" name="phone" ngModel/>
        </mat-form-field>
      </section>
    </section>
    <div class="form-user-action">
      <button mat-button type="button" (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" type="submit">Save</button>
    </div>
  </form>
  
  `,
  styleUrls: ['./form.component.scss'],
  standalone: false,
})
export class FormComponent {
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<PeopleForm> = new EventEmitter();

  onSave(person: PeopleForm): void {
    this.save.emit(person);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
