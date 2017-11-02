import { Component, OnInit, HostBinding } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { IdentityType, ApplicationError } from '../../shared/shared-types';
import { slideInDownAnimation } from '../../shared/animations';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../../core/logger.service';

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
  private subscription: Subscription;

  constructor(private userService: UserService, private logger: LoggerService) { }

  ngOnInit() {
    this.subscription = this.userService.findAllUsers()
      .do(users => this.logger.log(users))
      .subscribe(
        users => this.users = users,
        error => { this.errorMessage = error.toString(); }
      );
  }

  selectItem(user: User) {
    this.selectedUser = user;
  }

  addNewUser() {
    this.selectedUser = {} as User;
  }

  refreshUsers() {
    this.userService.refreshUsers();
  }

  editCompleted(user: User | undefined) {
    if (this.selectedUser && this.selectedUser.id) {  // EDIT
      this.replaceUser(user);
    } else { // ADD
      this.addUser(user);
    }
    this.selectedUser = undefined;
  }

  deleteUser(itemId: IdentityType) {
    this.userService.deleteUser(itemId)
      .subscribe(
        deleted => this.removeUser(deleted),
        error => {
          this.errorMessage = error.toString();
        }
      );
  }

  private removeUser(deleted: User) {
    if (deleted) {
      const index = this.users.findIndex(user => user.id === deleted.id);
      this.users.splice(index, 1);
    }
  }

  private replaceUser(edited: User) {
    if (edited) {
      const index = this.users.findIndex(user => user.id === edited.id);
      this.users.splice(index, 1, edited);
    }
  }

  private addUser(user: User) {
    if (user) {
      this.users.push(user);
    }
  }

}
