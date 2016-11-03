import {Component}      from '@angular/core';

@Component({
    selector: 'vote-taker',
    template: `
    <h2>Should mankind colonize the Universe?</h2>
    <h3>Agree: {{agreed}}, Disagree: {{disagreed}}</h3>
    <my-voter *ngFor="let voter of voters"
      [name]="voter"
      (onVoted)="onVoted($event)">
    </my-voter>
  `
})
export class VoteTakerComponent {
    public agreed = 0;
    public disagreed = 0;
    public voters = ['Mr. IQ', 'Ms. Universe aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaal', 'Bombasto'];
    public onVoted(agreed: boolean) {
        agreed ? this.agreed++ : this.disagreed++;
    }
}
