import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageData, MessageType } from '../shared/shared-types';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private _messages$ = new Subject<MessageData>();

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._messages$.next(undefined); // clear messages on route change
      }
    });
  }

  get messages() {
    return this._messages$.asObservable();
  }

  show(message: string, type: MessageType) {
    this._messages$.next({ message, type });
  }

  error(message: string) {
    this.show(message, MessageType.ERROR);
  }

  warn(message: string) {
    this.show(message, MessageType.WARNING);
  }

  success(message: string) {
    this.show(message, MessageType.SUCCESS);
  }

  info(message: string) {
    this.show(message, MessageType.INFO);
  }

  debug(message: string) {
    this.show(message, MessageType.DEBUG);
  }

}
