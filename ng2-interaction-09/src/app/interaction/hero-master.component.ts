import {Component} from '@angular/core';
import { HEROES } from './mock-heroes';

@Component({
    selector: 'hero-parent',
    template: `
    <h2>{{master}} controls {{heroes.length}} heroes</h2>
    <hero-child *ngFor="let hero of heroes"
      [name]="hero.name"
      [master]="master">
    </hero-child>
  `
})
export class HeroMasterComponent {
    public heroes = HEROES;
    public master: string = 'Master';

    constructor() {
      HEROES.push({ 'id': 0, 'name': '', 'power': 'Keeps Secrets', 'alterEgo': 'none', 'email': '' });
    }
}