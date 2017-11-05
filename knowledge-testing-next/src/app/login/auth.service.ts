/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { UserService } from '../users/user.service';
import { LoggerService } from '../core/logger.service';
import { User, Role } from '../users/user.model';

@Injectable()
export class AuthService {
  private loggedUser: User;

  constructor(private userService: UserService, private logger: LoggerService) {}

  login(email: string, password: string): Observable<boolean> {
    console.log(email, password);
    return this.userService.findUserByEmail(email)
      .do(user => this.logger.log(user))
      .map(user => {
        if (user && user.password === password) {
          this.loggedUser = user;
          return true;
        }
        return false;
      });
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout() {
    this.loggedUser = undefined;
  }

  isUserLoggedIn() {
    return !!this.loggedUser;
  }

  isUserInRole(...roles: Role[]) {
    return roles.indexOf(this.loggedUser.role) >= 0;
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  getSalutation() {
    return this.loggedUser ? `Welcome ${this.loggedUser.fname} ${this.loggedUser.lname}!` : '';
  }
}
