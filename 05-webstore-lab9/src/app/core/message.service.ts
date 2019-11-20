import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';

export enum MessageType {
  ERROR, WARNING, SUCCESS, INFO, DEBUG
}

export interface MessageData {
  message: string;
  type: MessageType;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages$ = new Subject<MessageData>();

  constructor(private router: Router) {
    // router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.messages$.next(undefined); // clear messages on route change
    //   }
    // });
  }

  get messages() {
    return this.messages$.asObservable();
  }

  show(message: string, type: MessageType) {
    this.messages$.next({ message, type });
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
