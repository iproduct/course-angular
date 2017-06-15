/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from './user.actions';
import { State } from '../reducers';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { ApplicationError } from '../common/common-types';
import { User } from './user.model';

@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private loginService: LoginService,
    private userActions: UserActions,
    private userService: UserService
  ) { }

  @Effect() load$ = this.actions$
    .ofType(UserActions.LOAD_USERS)
    .map(action => action.payload)
    .switchMap(() => this.userService.findAllUsers()
      .mergeMap(users => Observable.of(
        this.userActions.loadUsersSuccess(users)
      ))
      .catch((err) => Observable.of(
        this.userActions.loadUsersFailure(new ApplicationError<User>(err, null, User))
      ))
    );

  @Effect() loadUser$ = this.actions$
    .ofType(UserActions.LOAD_USER)
    .map(action => action.payload)
    .switchMap(userId => {
      return this.store
        .select(state => state.users).take(1)
        .flatMap(users => {
          const user = users.entities[userId];
          if (user) {
            return (Observable.of(this.userActions.loadUserSuccess(user)));
          } else {
            return this.userService.findUser(userId)
              .mergeMap(foundUser => Observable.of(
                this.userActions.loadUserSuccess(foundUser)
              ))
              .catch(err => Observable.of(
                this.userActions.loadUserFailure(new ApplicationError<User>(err, userId, User))
              ))
          }
        });
    });

  @Effect() add$ = this.actions$
    .ofType(UserActions.ADD_USER)
    .map(action => action.payload)
    .switchMap(user =>
      this.userService.addUser(user)
        .mergeMap(createdUser => Observable.of(
          this.userActions.addUserSuccess(createdUser)
        ))
        .catch(err => Observable.of(
          this.userActions.deleteUserFailure(new ApplicationError<User>(err, null, User, user))
        ))
    );

  @Effect() edit$ = this.actions$
    .ofType(UserActions.EDIT_USER)
    .map(action => action.payload)
    .switchMap(user =>
      this.userService.editUser(user)
        .mergeMap(editedUser => Observable.of(
          this.userActions.editUserSuccess(editedUser)
        ))
        .catch(err => Observable.of(
          this.userActions.deleteUserFailure(new ApplicationError<User>(err, user.id, User, user))
        ))
    );

  @Effect() delete$ = this.actions$
    .ofType(UserActions.DELETE_USER)
    .map(action => action.payload)
    .switchMap(userId =>
      this.userService.deleteUser(userId)
        .mergeMap(user => Observable.of(
          this.userActions.deleteUserSuccess(user)
        ))
        .catch(err => Observable.of(
          this.userActions.deleteUserFailure(new ApplicationError<User>(err, userId, User))
        ))
    );

  @Effect() logout$ = this.actions$
    .ofType(UserActions.LOGOUT)
    .map(action => action.payload)
    .switchMap(() => this.loginService.logout()
      .mergeMap((res: any) => Observable.of(
        this.userActions.logoutSuccess(res)
      )
      )
      .catch((err) => Observable.of(
        this.userActions.logoutFailure(err)
      ))
    );
}
