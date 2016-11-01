import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[myLogOnClick]'
})
export class LogOnClickDirective {
    @HostListener('click')
    public onClick() { console.log('Element clicked!'); }
}
