import { Component, Input, TemplateRef } from "@angular/core";
import { SharedImports } from "../../shared/imports/shared-imports";

@Component({
    selector: 'application-header',
    template: `
        <section>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </section>
    `,
    styleUrls: ['./people-app-header.component.scss'],
    imports: [...SharedImports]
})

export class PeopleAppHeaderComponent {
    @Input({ required: true }) headerTemplate: TemplateRef<void>;
}