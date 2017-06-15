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

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    DataListModule,
    MdSelectModule,
    MdInputModule,
    MdButtonModule,
    EffectsModule.run(UserEffects),
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
export class UserModule { }
