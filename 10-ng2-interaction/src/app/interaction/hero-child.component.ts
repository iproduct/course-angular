import {Component, Input} from '@angular/core';
@Component({
    selector: 'hero-child',
    template: `
    <h3>{{name}} says:</h3>
    <p>I, {{name}}, am at your service, {{master}}.</p>
  `, styles: [`
  p {
      color: green;
  }
  `]
})
export class HeroChildComponent {
    @Input() public master: string;
    private _name: string;

    @Input()
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get name() { return this._name; }
}
