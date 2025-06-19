import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ControlsFromInterface } from "../../../models/controls-from-interface";
import { PeopleForm } from "../../../models/people.model";

export interface PeopleFormGroup {
    id: FormControl<string | null>,
    photo: FormControl<string>,
    firstname: FormControl<string | null>,
    lastname: FormControl<string | null>,
    email: FormControl<string | null>,
    phone: FormControl<string | null>
}

export class PersonForm extends FormGroup<ControlsFromInterface<PeopleForm>> {
    constructor(data?: PeopleForm) {
        super({
            id: new FormControl(null),
            photo: new FormControl('https://randomuser.me/api/portraits/lego/6.jpg'),
            firstname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            lastname: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            email: new FormControl(null, [Validators.required, PersonForm.swordEmailValidator]),
            //phone: new FormControl(null, [Validators.required, Validators.pattern('\\d{10}')])
            phone: new FormControl(null, [Validators.required, PersonForm.phoneNumberValidator])
        });
        !!data && this.patchValue(data);
    }

    // Renvoit null si la validation est réussie, sinon renvoit { nomErreur: true } en cas d'echec
    static swordEmailValidator(control: AbstractControl<string | null>): ValidationErrors {
        if (!control.value)
            return null;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //const emailRegex = /^[a-zA-Z0-9._%+-]+@sword-group.com$/; n'aceepte que des mails qui se terminent par *.@sword-group.com
        return emailRegex.test(control.value) ? null : { email: true };
    }

    static phoneNumberValidator(control: AbstractControl<string | null>): ValidationErrors {
        if (!control.value) return null;

        const regexTel = /^(?:(?:\+|00)(33|49|32|352)|0)([1-9])(?:[\s\-\.]?\d{2}){4,5}$/;
        return regexTel.test(control.value) ? null : { phone: true };
    }
}
