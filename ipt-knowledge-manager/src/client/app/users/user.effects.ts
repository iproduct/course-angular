/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { UserActions } from './user.actions';
import { RootState } from './user.module'; // Root state type
import { State } from './user.reducer'; // User specific state type
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { ApplicationError } from '../shared/shared-types';
import { User } from './user.model';
import { getUsers, getUsersState } from './user.selectors';


@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<RootState>,
    private loginService: LoginService,
    private userActions: UserActions,
    private userService: UserService
  ) { }

  @Effect() load$ = this.actions$
    .ofType(UserActions.LOAD_USERS)
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
    .withLatestFrom(this.store.select<State>(getUsersState))
    .switchMap( ([userId, users]) => {
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
