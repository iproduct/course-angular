import { Component, Input, OnInit } from '@angular/core';

import { HeroCacheService }         from './hero-cache.service';

@Component({
  selector: 'app-hero-bio',
  template: `
    <h4>{{hero.name}}</h4>
    <ng-content></ng-content>
    <textarea cols="25" [(ngModel)]="hero.description"></textarea>`,
  providers: [HeroCacheService]
})

export class HeroBioComponent implements OnInit  {
  @Input() heroId: number;

  constructor(private heroCache: HeroCacheService) { }

  ngOnInit() { this.heroCache.fetchCachedHero(this.heroId); }

  get hero() { return this.heroCache.hero; }
}
