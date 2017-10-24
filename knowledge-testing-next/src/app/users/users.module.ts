import {MatInputModule, MatSelectModule, MatButtonModule, MatListModule, MatIconModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { SimpleReactiveComponent } from './simple-reactive/simple-reactive.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule
  ],
  declarations: [UserListComponent, UserDetailComponent, SimpleReactiveComponent],
  exports: [UserListComponent],
  providers: [UserService]
})
export class UsersModule { }
