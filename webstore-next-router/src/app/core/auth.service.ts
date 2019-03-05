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

import { Injectable, Inject, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../../core/services/users.service';
import { LoggerService } from '../../core/services/logger.service';
import { User, Role } from '../../core/users.model';
import { tap, map, catchError } from 'rxjs/operators';
import { Authenticate, AuthenticationResult } from '../auth.model';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { API_BASE_URL, Identifiable, IdentityType } from '../../shared/shared-types';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { COLLECTION_TYPES } from '../../constants';
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string, private http: HttpClient, private logger: LoggerService) {}

  /** POST: login with username and  password */
  login(credentials: Authenticate): Observable<AuthenticationResult> {
    this.logger.log(credentials);
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post<AuthenticationResult>(url, credentials).pipe(
      tap((result: AuthenticationResult) => this.logger.log(`Auth result: ${JSON.stringify(result)}.`)),
      catchError(this.handleError)
    );
  }

  /** POST: register with username and  password */
  register(user: User): Observable<User> {
    this.logger.log(user);
    const url = `${this.baseUrl}/auth/register`;
    return this.http.post<User>(url, user).pipe(
      tap((created: User) => this.logger.log(`Successfully registered user: ${JSON.stringify(created)} }.`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('Client-side error:', error.error.message);
    } else {
      // Backend unsuccessful status code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error || error)},
        message was: ${JSON.stringify(error.message)}`);
    }
    // return ErrorObservable with a user-facing error message
    return throwError('Invalid user credentials. Try again.');
  }
  
  // getSalutation() {
  //   return this.loggedUser ? `Welcome ${this.loggedUser.fname} ${this.loggedUser.lname}!` : '';
  // }
}
