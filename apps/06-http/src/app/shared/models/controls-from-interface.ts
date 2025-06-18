import { FormControl, FormGroup } from "@angular/forms";

type SafeAny = any;

export type ControlsFromInterface<T extends Record<string, SafeAny>> = {
    [key in keyof T]: T[key] extends Record<SafeAny, SafeAny> ? FormGroup<ControlsFromInterface<T[key]>> : FormControl<T[key]>;
}