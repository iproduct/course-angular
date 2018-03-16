/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
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
