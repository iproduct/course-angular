import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-user',
  template: '<img src="{{user.picture}}"/> {{user.name}}',
  changeDetection: ng.core.ChangeDetectionStrategy.OnPush
})
export class MyUserComponent {
  subscription: Subscription;
  user: { name: string, picture: string };

  constructor ( public user$: UserObservable, private chgRef: ChangeDetectorRef, private zone: NgZone) {}
  
  ngOnInit() {
    this.subscription = this.user$.subscribe( user => {
        this.zone.run(() => {
          this.user = user;
          this.chgRef.markForCheck();
        });
    });
  }

    
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}