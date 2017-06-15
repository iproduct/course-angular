import { Component, OnInit, OnDestroy, HostBinding, NgZone, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Subscription, Observable } from 'rxjs/Rx';
import { slideInDownAnimation } from '../../common/animations';
import { IdentityType } from '../../common/common-types';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { UserActions } from '../user.actions';
import { getSelectedUserId } from '../../reducers/index';


@Component({
  // moduleId: module.id,
  selector: 'ipt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [slideInDownAnimation]
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
    private store$: Store<fromRoot.State>,
    private userActions: UserActions) {
    this.users$ = store$.select(fromRoot.getUsers);
    this.loading$ = store$.select(fromRoot.getUsersLoading);
    this.selectedId$ = store$.select(fromRoot.getSelectedUserId);
  }

  public ngOnInit() {
    this.store$.dispatch(this.userActions.loadUsers());
    this.subscription = this.selectedId$
      .filter(id => !!id)
      .distinctUntilChanged()
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
