import {Directive, HostListener} from 'angular2/core';

@Directive({
    selector: "[myLogOnClick]",
//    host: {
//        '(click)': 'onClick()'
//    }
})
export class LogOnClickDirective {
    @HostListener('click')
    onClick() { console.log('Element clicked!'); }
}