import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { IdentityType, ApplicationError } from '../../shared/shared-types';
import { slideInDownAnimation } from '../../shared/animations';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../../core/logger.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [slideInDownAnimation]
})
export class UserListComponent implements OnInit, OnDestroy {
  @HostBinding('@routeAnimation') routeAnimation = true;

  users: User[] = [];
  selectedId: IdentityType;
  isNew = false;
  errorMessage = '';
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private logger: LoggerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.userService.findAllUsers()
      .do(users => this.logger.log(users))
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = error.toString()
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectItem(user: User) {
    this.selectedId = user.id;
    this.router.navigate([user.id], { relativeTo: this.route});
  }

  addNewUser() {
    // this.selectedUser = {} as User;
  }

  refreshUsers() {
    this.userService.refreshUsers();
  }

  // editCompleted(user: User | undefined) {
  //   if (this.selectedUser && this.selectedUser.id) {  // EDIT
  //     this.replaceUser(user);
  //   } else { // ADD
  //     this.addUser(user);
  //   }
  //   this.selectedUser = undefined;
  // }

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
