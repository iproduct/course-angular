import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  public log(msg: any) {
    if (isDevMode()) {
      console.log(msg);
    }
  }
  public error(msg: any) {
    if (isDevMode()) {
      console.error(msg);
    }
  }
  public warn(msg: any) {
    if (isDevMode()) {
      console.warn(msg);
    }
  }

}
