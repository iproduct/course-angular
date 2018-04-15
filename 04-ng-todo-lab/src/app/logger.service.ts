import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  log(msg: any) {
    if (isDevMode()) {
      console.log(msg);
    }
  }

  error(msg: any) {
    if (isDevMode()) {
      console.error(msg);
    }
  }

  warn(msg: any) {
    if (isDevMode()) {
      console.warn(msg);
    }
  }

}
