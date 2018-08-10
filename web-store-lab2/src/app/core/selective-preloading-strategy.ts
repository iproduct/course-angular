import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preloadedMods: string[] = [];

  constructor(private logger: LoggerService) {}

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      this.preloadedMods.push(route.path);
      this.logger.log('Preloaded: ' + route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
