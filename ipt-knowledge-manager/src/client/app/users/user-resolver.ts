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
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { User } from './user.model';
import { UserService } from './user.service';
import { Store } from '@ngrx/store';
import * as fromUsers from './user.module';
import { Observable } from 'rxjs/Rx';
import { UserActions } from './user.actions';
import { ApplicationError } from '../shared/shared-types';
import { getUsersState } from './user.selectors';
import { RootState } from './user.module';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private store$: Store<RootState>,
    private userService: UserService,
    private userActions: UserActions,
    private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<User> {
    const userId = route.params['id'];
    this.store$.dispatch(this.userActions.selectUser(userId ));
    return this.store$.select(getUsersState).take(1)
      .flatMap(users => {
        const user = users && users.entities && users.entities[userId];
        console.log('Resolved User:', user);
        if (user) {
          return (Observable.of(user));
        } else {
          return this.userService.findUser(userId)
            .switchMap(foundUser => {
              this.store$.dispatch(this.userActions.loadUserSuccess(foundUser));
              return Observable.of(foundUser);
            })
            .catch(err => {
              this.store$.dispatch(
                this.userActions.loadUserFailure(new ApplicationError<User>(err, userId, User)));
              throw err;
            })
        }
      });
  }
}
