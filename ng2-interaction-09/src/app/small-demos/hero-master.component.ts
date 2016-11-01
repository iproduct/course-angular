import {Component} from 'angular2/core';
import {HeroChildComponent} from './hero-child.component';
import {HEROES} from '../mock-heroes';

@Component({
    selector: 'hero-parent',
    template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="#name of names"
      [name]="name"
      [master]="master">
    </hero-child>
  `,
    directives: [HeroChildComponent]
})
export class HeroMasterComponent {
    heroes = HEROES;
    names = ['Mr. IQ', '   ', '  Bombasto  '];
    master: string = 'Master';
}