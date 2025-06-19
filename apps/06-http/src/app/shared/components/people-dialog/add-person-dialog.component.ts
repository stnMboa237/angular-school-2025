import { Component, inject } from "@angular/core";
import { PeopleForm } from "../../models/people.model";
import { MatDialogRef } from "@angular/material/dialog";
import { PeopleReactiveFormComponent } from "../Form/reactive-form/people-form-reactive.component";

@Component({
    selector: 'add-person-dialog',
    template: `
        <people-reactive-form (save)="closeDialog($event)" (cancel)="closeDialog()"/>
    `,
    styleUrls: ['./add-person-dialog.component.ts.scss'],
    imports: [PeopleReactiveFormComponent]
})

export class AddPersonDialogComponent {
    private readonly dialoRef: MatDialogRef<AddPersonDialogComponent> = inject(MatDialogRef);

    closeDialog(people: PeopleForm = null) {
        this.dialoRef.close(people);
    }

}