import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { IdentityType } from '../../shared/shared-types';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  selectedUser: User;
  isNew = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.findAllUsers().then(users => this.users = users);
  }

  selectItem(user: User) {
    this.selectedUser = user;
  }

  addNewUser() {
    this.selectedUser = {} as User;
  }

  editCompleted() {
    this.fetchUsers();
    this.selectedUser = undefined;
  }

  deleteUser(itemId: IdentityType) {
    this.userService.deleteUser(itemId).then(deleted => {
      this.fetchUsers();
    });
  }

}
