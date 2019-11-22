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

import { Injectable, Inject } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { Authenticate, AuthenticationResult } from './auth.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject } from 'rxjs';
import { MessageService } from '../core/message.service';
import { User } from '../users/user.model';
import { BASE_API_URL } from '../core/backend-http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn$ = new BehaviorSubject<AuthenticationResult>(undefined);
  get loggedIn() {
    return this._loggedIn$.asObservable();
  }
  redirectUrl: string;

  constructor(private http: HttpClient, private messages: MessageService) {}

  /** POST: login with username and  password */
  login(credentials: Authenticate): Observable<AuthenticationResult> {
    // this.logger.log(JSON.stringify(credentials));
    const url = `${BASE_API_URL}/auth/login`;
    return this.http.post<AuthenticationResult>(url, credentials).pipe(
      tap((result: AuthenticationResult) => {
        console.log(`Auth result: ${JSON.stringify(result)}.`);
        this._loggedIn$.next(result);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    console.log(`Logout.`);
    this._loggedIn$.next(undefined);
  }

  /** POST: register with username and  password */
  register(user: User): Observable<User> {
    console.log(JSON.stringify(user));
    const url = `${BASE_API_URL}/auth/register`;
    return this.http.post<User>(url, user).pipe(
      tap((created: User) => {
        console.log(`Successfully registered user: ${JSON.stringify(created)}.`);
        this.messages.success(`Successfully registered user: ${JSON.stringify(created)}.`);
      }),
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

}
