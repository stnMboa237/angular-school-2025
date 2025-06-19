import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[sfeirBadge]',
    standalone: true
})
export class BadgeDirective implements OnInit {
    private readonly defaultBadgeColor = 'black';
    @Input('sfeirBadge') isManager: boolean;
    @HostBinding('style.color') private iconColor = this.defaultBadgeColor;
    // avec HostBinding, je bind un propriété de l'element HTML de la directive en cours.
    // Dans cet exemple, je set la prop 'style.color' de l'element <span class="sfeir-badge" [sfeirBadge]="people.isManager"></span> où la directive est appelée.

    constructor(
        private readonly element: ElementRef<HTMLElement>,
        private readonly renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        if (this.isManager) {
            this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
        }
    }

    // hostListener permet de rester à l'écoute des evenements et aussi de setter la variable 'bindé' plus haut iconColor
    @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent): void {
        event.stopPropagation(); // stop la propagation de l'event
        this.iconColor = 'red';
    }

    @HostListener('mouseout', ['$event']) onMouseOut(event: MouseEvent): void {
        event.stopPropagation();
        this.iconColor = this.defaultBadgeColor;
    }
}
