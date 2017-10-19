import {MatInputModule, MatSelectModule, MatButtonModule, MatListModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  declarations: [UserListComponent, UserDetailComponent],
  exports: [UserListComponent],
  providers: [UserService]
})
export class UsersModule { }
