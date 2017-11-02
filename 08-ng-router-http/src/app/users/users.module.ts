import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers: [
    UserService
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  exports: [
    UserListComponent,
    UserDetailComponent
  ]
})
export class UserModule { }
