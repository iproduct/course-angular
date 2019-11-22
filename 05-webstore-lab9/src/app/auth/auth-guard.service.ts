import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
  CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { take, flatMap, map } from 'rxjs/operators';
import { DialogService } from '../core/dialog.service';
import { Role } from '../users/user.model';
import { AuthenticationResult } from './auth.model';
import { MessageService } from '../core/message.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  private authResult: AuthenticationResult | undefined = undefined;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.authService.loggedIn.subscribe( authResult => this.authResult = authResult);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url, route.data.rolesAllowed);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkLogin(state.url, route.data.rolesAllowed);
  }

  canLoad(route: Route): Observable<boolean> {
    const url = `/${route.path}`;
    return this.checkLogin(url, route.data.rolesAllowed);
  }

  checkLogin(url: string, rolesAllowed: Role[]): Observable<boolean> {
    if (this.authResult && this.authResult.auth) {
        // user is in a role allowed, or no alllowed roles specified
        if (!rolesAllowed || rolesAllowed.indexOf(this.authResult.user.role) >= 0) {
          return of(true);
        } else  {
          this.messageService.warn('Insufficient privilegies.');
          return of(false);
        }
    } else { // not logged in
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
