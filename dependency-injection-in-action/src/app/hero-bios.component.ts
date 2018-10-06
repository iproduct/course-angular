import { Component }             from '@angular/core';

import { HeroService }          from './hero.service';
import { LoggerService }        from './logger.service';

//////// HeroBiosComponent ////
@Component({
  selector: 'app-hero-bios',
  template: `
    <app-hero-bio [heroId]="1"></app-hero-bio>
    <app-hero-bio [heroId]="2"></app-hero-bio>
    <app-hero-bio [heroId]="3"></app-hero-bio>`,
  providers: [HeroService]
})
export class HeroBiosComponent {
  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosComponent');
  }
}

//////// HeroBiosAndContactsComponent ////
@Component({
  selector: 'app-hero-bios-and-contacts',
  template: `
    <app-hero-bio [heroId]="1"> <app-hero-contact></app-hero-contact> </app-hero-bio>
    <app-hero-bio [heroId]="2"> <app-hero-contact></app-hero-contact> </app-hero-bio>
    <app-hero-bio [heroId]="3"> <app-hero-contact></app-hero-contact> </app-hero-bio>`,
  providers: [HeroService]
})
export class HeroBiosAndContactsComponent {
  constructor(logger: LoggerService) {
    logger.logInfo('Creating HeroBiosAndContactsComponent');
  }
}
