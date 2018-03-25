import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import {MissionService} from './mission.service';
import {Subscription}   from 'rxjs/Subscription';
@Component({
    selector: 'my-astronaut',
    encapsulation: ViewEncapsulation.Native,
    template: `
    <p>
      {{astronaut}}: <strong>{{mission}}</strong>
      <button
        (click)="confirm()"
        [disabled]="!announced || confirmed">
        Confirm
      </button>
    </p>
  `,
    styles: [`
        :host { color: green;  }
      `]
})
export class AstronautComponent implements OnDestroy {
    @Input() public astronaut: string;
    public mission = '<no mission announced>';
    public confirmed = false;
    public announced = false;
    public subscription: Subscription;
    constructor(private missionService: MissionService) {
        this.subscription = missionService.missionAnnounced.subscribe(
            mission => {
                this.mission = mission;
                this.announced = true;
                this.confirmed = false;
            });
    }
    public confirm() {
        this.confirmed = true;
        this.missionService.confirmMission(this.astronaut);
    }
    public ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
