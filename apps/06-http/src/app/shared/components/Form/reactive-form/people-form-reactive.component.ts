import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { SharedImports } from "../../../imports/shared-imports";
import { People, PeopleForm } from "../../../models/people.model";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { PersonForm } from "./people-form";

@Component({
    selector: 'people-reactive-form',
    template: `
        <form  novalidate [formGroup]="peopleForm" (ngSubmit)="onSave()" data-testid="people-reactive-form">
            <!-- img -->
            <section class="form-container">
                <section class="form-container__image">
                    <img [ngSrc]="peopleForm.value.photo" alt="person-photo" width="100" height="100">
                    <input type="hidden" name="photo" formControlName="photo" />
                </section>
                <section>
                    <!-- firstname -->
                    <mat-form-field>
                        <mat-label>First name</mat-label>
                        <input type="text" name="firstname" matInput placeholder="First name" formControlName="firstname" />
                        @if(peopleForm.controls.firstname.errors?.['required']){
                            <mat-error>Ce champ est requis</mat-error>
                        }
                        @if(peopleForm.controls.firstname.errors?.['minLength']){
                            <mat-error>Ce champ doit posséder au moins 2 caractères</mat-error>
                        }
                    </mat-form-field>
                    <!-- lastname -->
                    <mat-form-field>
                        <mat-label>Last name</mat-label>
                        <input type="text" name="lastname" matInput placeholder="Last name" formControlName="lastname"/>
                        @if(peopleForm.controls.lastname.errors?.['required']){
                            <mat-error>Ce champ est requis</mat-error>
                        }
                        @if(peopleForm.controls.lastname.errors?.['minLength']){
                            <mat-error>Ce champ doit posséder au moins 2 caractères</mat-error>
                        }
                    </mat-form-field>
                    <!-- Email -->
                    <mat-form-field>
                        <mat-label>Email</mat-label>
                        <input type="email" name="email" matInput placeholder="example@monmail.com" formControlName="email" />
                        @if(peopleForm.controls.email.errors?.['required']){
                            <mat-error>Ce champ est requis</mat-error>
                        }
                        @if(peopleForm.controls.email.errors?.['swordEmail']){
                        <mat-error>Ce champ doit contenir un email SWORD</mat-error>
                        }
                    </mat-form-field>
                    <!-- Phone -->
                    <mat-form-field>
                        <mat-label>Phone</mat-label>
                        <input type="text" name="phone" matInput placeholder="Phone" formControlName="phone"/>
                        @if(peopleForm.controls.phone.errors?.['required']){
                            <mat-error>Ce champ est requis</mat-error>
                        }
                        @if(peopleForm.controls.phone.errors?.['pattern']){
                            <mat-error>Le téléphone doit avoir 10 chiffres</mat-error>
                        }
                    </mat-form-field>
                </section>
            </section>
            <!-- buttons -->
            <div class="form-user-action">
                <button mat-button type="button" (click)="onCancel()">Cancel</button>
                <button mat-button color="primary" type="submit" [disabled]="peopleForm.invalid" >Save</button>
            </div>
        </form>
    `,
    styleUrls: ['./people-form-reactive.component.scss'],
    imports: [...SharedImports, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule]
})

export class PeopleReactiveFormComponent implements OnChanges {

    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() save: EventEmitter<PeopleForm> = new EventEmitter();
    @Input() people: People;
    protected peopleForm = new PersonForm();

    ngOnChanges(changes: SimpleChanges): void {
        const { people } = changes;
        if (people.currentValue !== people.previousValue) {
            this.peopleForm.patchValue(this.people);
        }
    }

    onSave() {
        this.save.emit(this.peopleForm.getRawValue());
    }

    onCancel() {
        this.cancel.emit();
    }
}