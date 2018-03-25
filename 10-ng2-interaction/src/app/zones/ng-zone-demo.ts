import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'ng-zone-demo',
  template: `
    <h2>Demo: NgZone</h2>
    <p>Progress: {{progress}}%</p>
    <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
    <button (click)="processWithinAngularZone()">Process within Angular zone</button>
    <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
  `,
})
export class NgZoneDemo {
  public progress: number = 0;
  public label: string;
  constructor(private ngZone: NgZone) { }
  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  public processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }
  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  public processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this.ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this.ngZone.run( () => console.log('Outside Done!') );
      });
    });
  }
  public _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);
    if (this.progress < 100) {
      window.setTimeout( () => this._increaseProgress(doneCallback), 50);
    } else {
      doneCallback();
    }
  }
}
