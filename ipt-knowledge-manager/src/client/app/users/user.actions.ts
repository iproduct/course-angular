/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { User, Credentials } from './user.model';
import { IdentityType, ApplicationError } from '../shared/shared-types';

@Injectable()
export class UserActions {

  // Load all users
  static LOAD_USERS = '[User] Load Users';
  loadUsers(): Action {
    return {
      type: UserActions.LOAD_USERS
    };
  }

  static LOAD_USERS_SUCCESS = '[User] Load Users Success';
  loadUsersSuccess(users: User[]): Action {
    return {
      type: UserActions.LOAD_USERS_SUCCESS,
      payload: users
    };
  }

  static LOAD_USERS_FAILURE = '[User] Load Users Failure';
  loadUsersFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.LOAD_USERS_FAILURE,
      payload: error
    };
  }

  // Load individual user
  static LOAD_USER = '[User] Load User';
  loadUser(userId: IdentityType): Action {
    return {
      type: UserActions.LOAD_USER,
      payload: userId
    };
  }

  static LOAD_USER_SUCCESS = '[User] Load User Success';
  loadUserSuccess(user: User): Action {
    return {
      type: UserActions.LOAD_USER_SUCCESS,
      payload: user
    };
  }

  static LOAD_USER_FAILURE = '[User] Load User Failure';
  loadUserFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.LOAD_USER_FAILURE,
      payload: error
    };
  }

  // Select user
  static SELECT_USER = '[User] Select User';
  selectUser(userId: IdentityType): Action {
    return {
      type: UserActions.SELECT_USER,
      payload: userId
    };
  }

  // Add new user
  static ADD_USER = '[User] Add User';
  addUser(user: User): Action {
    return {
      type: UserActions.ADD_USER,
      payload: user
    };
  }

  static ADD_USER_SUCCESS = '[User] Add User Success';
  addUserSuccess(user: User): Action {
    return {
      type: UserActions.ADD_USER_SUCCESS,
      payload: user
    };
  }

  static ADD_USER_FAILURE = '[User]  Add User Failure';
  addUserFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.ADD_USER_FAILURE,
      payload: error
    };
  }

  // Edit existing user
  static EDIT_USER = '[User] Edit User';
  editUser(user: User): Action {
    return {
      type: UserActions.EDIT_USER,
      payload: user
    };
  }

  static EDIT_USER_SUCCESS = '[User] Edit User Success';
  editUserSuccess(user: User): Action {
    return {
      type: UserActions.EDIT_USER_SUCCESS,
      payload: user
    };
  }

  static EDIT_USER_FAILURE = '[User] Edit User Failure';
  editUserFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.EDIT_USER_FAILURE,
      payload: error
    };
  }

  // Delete user by id
  static DELETE_USER = '[User] Delete User';
  deleteUser(userId: IdentityType): Action {
    return {
      type: UserActions.DELETE_USER,
      payload: userId
    };
  }

  static DELETE_USER_SUCCESS = '[User] Delete User Success';
  deleteUserSuccess(deletedUser: User): Action {
    return {
      type: UserActions.DELETE_USER_SUCCESS,
      payload: deletedUser
    };
  }

  static DELETE_USER_FAILURE = '[User] Delete User Failure';
  deleteUserFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.DELETE_USER_FAILURE,
      payload: error
    };
  }

  // User login
  static LOGIN = '[User] Login';
  login(credentials: Credentials): Action {
    return {
      type: UserActions.LOGIN,
      payload: credentials
    };
  }

  static LOGIN_SUCCESS = '[User] Logout Success';
  loginSuccess(res: Response): Action {
    return {
      type: UserActions.LOGIN_SUCCESS,
      payload: res
    };
  }

  static LOGIN_FAILURE = '[User] Logout Failure';
  loginFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.LOGIN_FAILURE,
      payload: error
    };
  }

  // User logout
  static LOGOUT = '[User] Logout';
  logout(): Action {
    return {
      type: UserActions.LOGOUT
    };
  }

  static LOGOUT_SUCCESS = '[User] Logout Success';
  logoutSuccess(res: Response): Action {
    return {
      type: UserActions.LOGOUT_SUCCESS,
      payload: res
    };
  }

  static LOGOUT_FAILURE = '[User] Logout Failure';
  logoutFailure(error: ApplicationError<User>): Action {
    return {
      type: UserActions.LOGOUT_FAILURE,
      payload: error
    };
  }
}
