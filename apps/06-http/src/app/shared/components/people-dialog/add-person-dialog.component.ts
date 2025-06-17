import { Component } from "@angular/core";
import { FormComponent } from "../Form/form.component";
import { PeopleForm } from "../../models/people.model";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'add-person-dialog',
    template: `
        <people-form (save)="closeDialog($event)" (cancel)="closeDialog()"/>
    `,
    styleUrls: ['./add-person-dialog.component.ts.scss'],
    imports: [FormComponent]
})

export class AddPersonDialogComponent {
    constructor(private readonly dialoRef: MatDialogRef<AddPersonDialogComponent>) { }
    closeDialog(people: PeopleForm = null) {
        this.dialoRef.close(people);
    }

}