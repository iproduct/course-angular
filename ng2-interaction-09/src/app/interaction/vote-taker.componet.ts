import {Component}      from '@angular/core';
import { HEROES } from './mock-heroes';

@Component({
    selector: 'vote-taker',
    template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
    <my-voter *ngFor="let voter of heroes"
       length=5
      [name]="voter.name"
      (onVoted)="onVoted($event)">
    </my-voter>
  `
})
export class VoteTakerComponent {
    public agreed = 0;
    public disagreed = 0;
    // public voters = ['Mr. IQ', 'Ms. Universe aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal', 'Bombasto'];
    public heroes = HEROES;
    public onVoted(agreed: boolean) {
        agreed ? this.agreed++ : this.disagreed++;
    }
}
