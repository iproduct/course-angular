import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, Gender, Role } from '../user.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'ws-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;
  selectedMode: string;

  constructor(private service: UserService) { }

  ngOnInit() {
    this.refresh();
  }

  async refresh() {
    this.service.findAll().subscribe(
      users => this.users = users
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  handleUserChange(user: User) {
    if (user.id) {
      this.service.update(user).subscribe(u => this.upsertUser(u));
    } else {
      this.service.create(user).subscribe(u => this.upsertUser(u));
    }
    this.selectedUser = undefined;
    // this.refresh();
  }

  addUser() {
    this.selectedUser = new User(undefined, undefined, undefined);
    this.selectedMode = 'create';
  }

  userCanceled() {
    this.selectedUser = undefined;
  }

  deleteUser(user: User) {
    this.service.delete(user.id).subscribe(u => this.removeUser(u));
  }

  getAvatarUrl(user) {
    return user.avatarUrl ? user.avatarUrl :
      user.gender === Gender.FEMALE ? 'assets/img/female-avatar.jpg' : 'assets/img/male-avatar.png';
  }

  getRoleName(role: Role) {
    return Role[role];
  }

  private upsertUser(user: User): void {
    if (!user) return;
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users[index] = user;
    } else {
      this.users.push(user);
    }
  }

  private removeUser(user: User): void {
    if (!user) return;
    const index = this.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }
}
