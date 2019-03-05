/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild,
  NavigationExtras,  CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { of, Observable } from 'rxjs';
import { take, flatMap, map } from 'rxjs/operators';
import { DialogService } from './dialog.service';
import { Role } from '../users/user.model';


@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  private isAlerted = false;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService) { }

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
    return this.store.pipe(
      select(fromAuthRoot.selectLoggedIn),
      flatMap(authed => {
        if (!authed) {
          this.store.dispatch(new LoginRedirect(url));
          return of(false);
        } else {
          return this.store.pipe(
            select(fromAuthRoot.selectUser),
            flatMap(user => {
              if (!rolesAllowed || rolesAllowed.indexOf(user.role) >= 0) { // user is in a role allowed, or no alllowed roles specified
                return of(true);
              } else  {
                return this.dialogService.alert('Error: Insufficient privilegies.').pipe(
                  map(() => false)
                );
              }
            }),
            take(1)
          );
        }
      })
    );
  }
}
