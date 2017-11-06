import {HostBinding, Directive,  HostListener} from '@angular/core';

@Directive({
    selector: "[myLogOnClick]",
//    host: {
//        '(click)': 'onClick()'
//    }
})
export class LogOnClickDirective {
    @HostBinding('style.backgroundColor')  color = '#00ff00';
    @HostListener('click')
    onClick() {
        console.log('Element clicked again!');
        this.color = '#ff0000';
    }
}
