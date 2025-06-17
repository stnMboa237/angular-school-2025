import { Component, EventEmitter, Output } from "@angular/core";
import { SharedImports } from "../../imports/shared-imports";
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { PeopleForm } from "../../models/people.model";
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'people-form',
    template: `
        <form #peopleForm="ngForm" (ngSubmit)="onSave(peopleForm.value)" data-testid='people-form'>
            <section class="form-container">
                <section class="form-container__image">
                    <img width="100" height="100" ngSrc="https://randomuser.me/api/portraits/lego/6.jpg" alt="person-photo"/>
                    <input type="hidden" name="photo" ngModel="https://randomuser.me/api/portraits/lego/6.jpg" />
                </section>
                <section>
                <mat-form-field>
                    <mat-label>First name</mat-label>
                    <input type="text" matInput placeholder="First name" name="firstname" #firstname="ngModel" ngModel required minlength="2" />
                    @if (firstname.errors?.['required']) {
                    <mat-error>Ce champs est requis</mat-error>
                    }
                    @if (firstname.errors?.['minlength']) {
                    <mat-error>Ce champs doit posséder minimum 2 caractères</mat-error>
                    }
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Last name</mat-label>
                    <input type="text" matInput placeholder="Last name" name="lastname" #lastname="ngModel" ngModel required minlength="2" />
                    @if (lastname.errors?.['required']) {
                    <mat-error>Ce champs est requis</mat-error>
                    }
                    @if (lastname.errors?.['minlength']) {
                    <mat-error>Ce champs doit posséder minimum 2 caractères</mat-error>
                    }
                    <!-- @if(!lastname.valid && lastname.touched) {
                        <mat-error>Ce champs doit avoir au moins 2 caractères</mat-error>
                    } -->
                </mat-form-field>
                <mat-form-field>
                    <mat-label>Email</mat-label>
                    <input type="email" matInput placeholder="email" name="email" #email="ngModel" ngModel required />
                    @if (email.errors?.['required']) {
                    <mat-error>Ce champs est requis</mat-error>
                    }
                </mat-form-field>
                <mat-form-field>
                    <mat-label>phone</mat-label>
                    <input type="phone" matInput placeholder="phone" name="phone" #phone="ngModel" ngModel required pattern="\\d{10}" />
                    @if (phone.errors?.['required']) {
                    <mat-error>Ce champs est requis</mat-error>
                    }
                    @if (phone.errors?.['pattern']) {
                    <mat-error>Ce champs doit respecter le pattern suivant (10 chiffres)</mat-error>
                    }
                </mat-form-field>
                </section>
            </section>
            <div class="form-user-action">
                <button mat-button type="button" (click)="onCancel()">Cancel</button>
                <button mat-button color="primary" type="submit" [disabled]="peopleForm.invalid">Save</button>
            </div>
        </form>
    `,
    styleUrls: ['./form.component.scss'],
    imports: [...SharedImports, MatFormFieldModule, FormsModule, MatInputModule]
})

export class FormComponent {
    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() save: EventEmitter<PeopleForm> = new EventEmitter();

    onSave(person: PeopleForm): void {
        this.save.emit(person);
    }

    onCancel() {
        this.cancel.emit();
    }
}