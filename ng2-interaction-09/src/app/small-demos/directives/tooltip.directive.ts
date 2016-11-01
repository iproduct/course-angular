import {Directive, HostListener, Input} from 'angular2/core';

@Directive({
    selector: '[myTooltip]',
    host: {
        '(mouseover)': 'show()'
    }
})
export class TooltipDirective {
    @Input('myTooltip') text: string;

    show() {
        alert(this.text);
    }
}