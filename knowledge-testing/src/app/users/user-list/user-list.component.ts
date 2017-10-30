import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { IdentityType, ApplicationError } from '../../shared/shared-types';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [slideInDownAnimation]
})
export class UserListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  users: User[] = [];
  selectedUser: User;
  isNew = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.findAllUsers()
      .then(users => this.users = users)
      .catch(error => {
        this.errorMessage = error.toString();
      });
  }

  selectItem(user: User) {
    this.selectedUser = user;
  }

  addNewUser() {
    this.selectedUser = {} as User;
  }

  editCompleted(user: User | undefined) {
    // this.fetchUsers();
    if (user) {
     this.users.push(user);
    }
    this.selectedUser = undefined;
  }

  deleteUser(itemId: IdentityType) {
    this.userService.deleteUser(itemId)
    .then(deleted => {
      this.fetchUsers();
    })
    .catch(error => {
      this.errorMessage = error.toString();
    });
  }

}
