/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, OnInit, OnDestroy, HostBinding, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { slideInDownAnimation } from '../../shared/animations';
import { IdentityType } from '../../shared/shared-types';
import { Store } from '@ngrx/store';
import * as fromUsers from '../user.module';
import { UserActions } from '../user.actions';
import { RootState } from '../user.module';
import { getUsers, getUsersLoading, getSelectedUserId } from '../user.selectors';

@Component({
  // moduleId: module.id,
  selector: 'ipt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [slideInDownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.position') position = 'absolute';

  public users$: Observable<User[]>;
  public loading$: Observable<boolean>;
  public selectedId$: Observable<IdentityType>;
  public firstRecord = 0;
  public errorMessage: string;
  private subscription: Subscription;

  constructor(
    private store$: Store<RootState>,
    private userActions: UserActions) {
    this.users$ = store$.select(getUsers);
    this.loading$ = store$.select(getUsersLoading);
    this.selectedId$ = store$.select(getSelectedUserId);
  }

  public ngOnInit() {
    this.store$.dispatch(this.userActions.loadUsers());
    this.subscription = this.selectedId$
      .filter(id => !!id)
      .subscribe(id => this.store$.dispatch(go(['users', id])));
  }

  public ngOnDestroy() {
    this.unsubscribe();
  }

  public selectUser(user: User) {
    this.store$.dispatch(this.userActions.selectUser(user.id));
  }

  public deleteUser(userId: string) {
    console.log('Deleting user ID: ', userId);
    this.store$.dispatch(this.userActions.deleteUser(userId));
  }

  public addNewUser() {
    this.store$.dispatch(this.userActions.selectUser(null));
    this.store$.dispatch(go(['users', 'new']));
  }

  public paginate(event) {
    this.firstRecord = event.first;
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
