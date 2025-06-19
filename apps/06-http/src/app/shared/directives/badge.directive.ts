import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[sfeirBadge]',
    standalone: true
})
export class BadgeDirective implements OnInit {
    private readonly defaultBadgeColor = 'black';
    @Input('sfeirBadge') isManager: boolean;
    @HostBinding('style.color') iconColor = this.defaultBadgeColor;


    constructor(
        private readonly element: ElementRef<HTMLElement>,
        private readonly renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        if (this.isManager) {
            this.renderer.setProperty(this.element.nativeElement, 'innerHTML', '<i class="material-icons">supervisor_account</i>');
        }
    }

    @HostListener('mouseover', ['$event']) onMouseOver(event: MouseEvent): void {
        event.stopPropagation();
        this.iconColor = 'red';
    }

    @HostListener('mouseout', ['$event']) onMouseOut(event: MouseEvent): void {
        event.stopPropagation();
        this.iconColor = this.defaultBadgeColor;
    }
}
