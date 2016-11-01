import {Component, Input} from 'angular2/core';
import {Hero} from '../hero';
@Component({
    selector: 'hero-child',
    template: `
    <h3>{{name}} says:</h3>
    <p>I, {{name}}, am at your service, {{master}}.</p>
  `
})
export class HeroChildComponent {
    private _name: string;
    @Input() master: string;

    @Input()
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get name() { return this._name; }
}