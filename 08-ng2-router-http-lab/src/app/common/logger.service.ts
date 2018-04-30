import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  public log(msg: any)   { console.log(msg); }
  public error(msg: any) { console.error(msg); }
  public warn(msg: any)  { console.warn(msg); }
}
