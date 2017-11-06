import { ElementRef, NgZone, Renderer2, Injectable } from '@angular/core';

@Injectable()
export class ToggleClassService {
  public renderer: Renderer2;

  constructor(private zone: NgZone) {}

  public toggleElementClass(element: ElementRef,  className = 'checked') {
    const a = element.nativeElement.querySelector('a');
    this.renderer.addClass(a, className);
    // a.classList.add(className);
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.renderer.removeClass(a, className);
        // a.classList.remove(className);
      }, 2000);
    })
  }
}
