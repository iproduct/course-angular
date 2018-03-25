import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'my-renderer2',
  templateUrl: './renderer2.component.html',
  styleUrls: ['./renderer2.component.css']
})
export class Renderer2Component {
  @ViewChild('content') public content: ElementRef;
  @ViewChild('appendNativeElementElem') public appendNativeElementElem: ElementRef;
  @ViewChild('appendRenderer2Elem') public appendRenderer2Elem: ElementRef;

  constructor(private renderer: Renderer2) { }

  public appendNativeElement() {
    this.appendNativeElementElem.nativeElement.appendChild(this.content.nativeElement);
  }

  public appendRenderer2() {
    this.renderer.appendChild(this.appendRenderer2Elem.nativeElement, this.content.nativeElement);
  }

}
