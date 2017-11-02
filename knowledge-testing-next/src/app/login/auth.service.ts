import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { UserService } from '../users/user.service';
import { LoggerService } from '../core/logger.service';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private userService: UserService, private logger: LoggerService) {}

  login(email: string, password: string): Observable<boolean> {
    console.log(email, password);
    return this.userService.findUserByEmail(email)
      .do(user => this.logger.log(user))
      .map(user => (this.isLoggedIn = user.password === password));
    // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
