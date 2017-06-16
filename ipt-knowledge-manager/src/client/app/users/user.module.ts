import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { DataListModule } from 'primeng/primeng';
import { MdSelectModule, MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

import { UserDetailComponent } from './components/user-detail.component';
import { UserListComponent } from './components/user-list.component';
import { UserService } from './user.service';
import { UserRoutingModule } from './user-routing.module';
import { LoginService } from './login.service';
import { UserEffects } from './user.effects';
import { UserActions } from './user.actions';
import { UserResolver } from './user-resolver';
import { RootState as State, reducers, reducer } from '../root.reducer';
import { Store, combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core';
import { environment } from '../../environments/environment';
import { usersReducer, State as UserState } from './user.reducer';
import * as fromUsers from './user.reducer';
import { createSelector } from 'reselect';
import { SharedModule } from '../shared/shared.module';
import { makeRootReducer } from '../shared/reducer-helpers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule,
    DataListModule,
    MdSelectModule,
    MdInputModule,
    MdButtonModule,
    EffectsModule.run(UserEffects)
  ],
  providers: [
    UserService,
    LoginService,
    UserActions,
    UserResolver
  ],
  declarations: [
    UserDetailComponent,
    UserListComponent
  ],
  exports: [
    UserDetailComponent,
    UserListComponent
  ]
})
export class UserModule {
  constructor(private store: Store<State>) {
    reducers.users = usersReducer;
    store.replaceReducer(makeRootReducer<RootState>(reducers));
  }
}

export interface RootState extends State {
  users: UserState;
}
