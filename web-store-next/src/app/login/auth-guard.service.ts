/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
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
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import { AuthService } from './auth.service';
import { Role } from '../users/user.model';
import { DialogService } from '../core/dialog.service';
import {NavigationEnd, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {
  private isAlerted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialogService: DialogService
  ) {
    // this.router.events
    // .filter(event => event instanceof NavigationEnd)
    // .subscribe(event => {
    //   this.isAlerted = false;
    // });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canLoad(route: Route): Promise<boolean> {
    const url = `/${route.path}`;
    return this.checkLogin(url);
  }

  checkLogin(url: string): Promise<boolean> {
    if (this.authService.isUserLoggedIn()) {
      if (this.authService.isUserInRole(Role.ADMIN)) {
        return Promise.resolve(true);
      } else  {
        this.dialogService.alert('Error: Insufficient privilegies. You should be ADMIN to manage users.');
      }
    } else { // not logged in
      this.router.navigate(['/login'], { queryParams: { url } });
    }
    return  Promise.resolve(false);
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;
  }
}
