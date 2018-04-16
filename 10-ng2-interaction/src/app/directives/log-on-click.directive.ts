import {HostBinding, Directive,  HostListener, Host} from '@angular/core';

@Directive({
    selector: '[myLogOnClick]',
//    host: {
//        '(click)': 'onClick()'
//    }
})
export class LogOnClickDirective {
    // @HostBinding('style.backgroundColor')  public color = '#00ff00';
    @HostListener('click')
    public onClick() {
        console.log('Element clicked again!');
        // this.color = '#ff0000';
    }
}
