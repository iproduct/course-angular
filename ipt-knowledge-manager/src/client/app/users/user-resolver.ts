import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs/Rx';
import { UserActions } from './user.actions';
import { ApplicationError } from '../common/common-types';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(private store: Store<State>, private userService: UserService, private userActions: UserActions, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.params['id'];
    return this.store.select(fromRoot.getUsersState).take(1)
      .flatMap(users => {
        const user = users.entities[userId];
        if (user) {
          return (Observable.of(user));
        } else {
          return this.userService.findUser(userId)
            .switchMap(foundUser => {
              this.store.dispatch(this.userActions.loadUserSuccess(foundUser));
              return Observable.of(foundUser);
            })
            .catch(err => {
              this.store.dispatch(
                this.userActions.loadUserFailure(new ApplicationError<User>(err, userId, User)));
              throw err;
            })
        }
      });
  }
}
