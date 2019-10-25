import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../../../../webstore-next-router/src/app/core/logger.service';

@Injectable({
  providedIn: 'root'
})
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
