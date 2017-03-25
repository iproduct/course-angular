import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';
import { UserDetailComponent } from './user-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
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
