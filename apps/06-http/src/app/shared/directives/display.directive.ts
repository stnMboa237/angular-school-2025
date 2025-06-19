import { NgIfContext } from "@angular/common";
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";


@Directive({
    selector: '[sfeirDisplay]'
})

export class DisplayDirective {
    // avec les directives, mieux vaut toujours utiliser le constructeur pour faire nos injections de dépendance car 
    // si j'appelle 'inject', il y a parfois des soucis
    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<NgIfContext>
    ) { }

    @Input('sfeirDisplay') set condition(myCondition: boolean) {
        myCondition ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
    }
}