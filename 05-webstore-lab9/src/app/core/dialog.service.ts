import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string) {
    return new Observable<boolean>(subscriber => {
      subscriber.next(window.confirm(message || 'Is it OK?'));
      subscriber.complete();
    });
  }

  alert(message?: string) {
     return new Observable<void>(subscriber => {
      subscriber.next(window.alert(message || 'Is it OK?'));
      subscriber.complete();
    });
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
