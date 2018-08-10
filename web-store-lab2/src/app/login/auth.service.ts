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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../core/user.service';
import { LoggerService } from '../core/logger.service';
import { User, Role, Admin } from '../shared/user.model';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private loggedUser: User;

  constructor(private userService: UserService, private logger: LoggerService) {}

  login(email: string, password: string): Observable<boolean> {
    console.log(email, password);
    return this.userService.findByEmail(email).pipe(
      tap(user => this.logger.log(user)),
      map(user => {
        if (user && user.password === password) {
          this.loggedUser = user;
          return true;
        }
        return false;
      })
    );
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
    return this.loggedUser ? `Welcome ${this.loggedUser.firstName} ${this.loggedUser.lastName}!` : '';
  }
}
