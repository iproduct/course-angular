import { Injectable } from '@angular/core';
/**
 * Asyncronous modal dialog service
 */
@Injectable()
export class DialogService {
  /**
   * Ask user to confirm an action.
   * @param `message` the confirmation message to show
   * @return promise of confirmation resolution (true=confirm or false=cancel)
   */
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'OK?'));
    });
  };
}
