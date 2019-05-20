import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User, Gender, Role } from '../user.model';
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
// import { MessageService } from '../../core/message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ws-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User;
  selectedMode: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private service: UserService
    //,  private messageService: MessageService
     ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qparams => {
      if (qparams['refresh']) {
        this.refresh();
      }
    });
    this.refresh();
  }

  async refresh() {
    this.service.findAll().subscribe(
      users => {
        this.users = users;
        this.selectedUser = undefined;
      },
      // err => this.messageService.error(err)
    );
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.router.navigate(['users', this.selectedMode, user.id]);
  }

  selectMode(mode: string) {
    this.selectedMode = mode;
  }

  handleUserChange(user: User) {
    if (user.id) {
      this.service.update(user).subscribe(
        u => {
          this.upsertUser(u);
          // this.messageService.success(`Successfully updated user: ${u.username}`);
        },
        // err => this.messageService.error(err)
      );
    } else {
      this.service.create(user).subscribe(
        u => {
          this.upsertUser(u);
          // this.messageService.success(`Successfully added user: ${u.username}`);
        },
        // err => this.messageService.error(err)
      );
    }
    this.selectedUser = undefined;
    // this.refresh();
  }

  addUser() {
    this.selectedUser = new User(undefined, undefined, undefined);
    this.selectedMode = 'create';
    this.router.navigate(['users', this.selectedMode]);
  }

  userCanceled() {
    this.selectedUser = undefined;
  }

  deleteUser(user: User) {
    this.service.delete(user.id).subscribe(
      u => {
          this.removeUser(u);
          this.selectedUser = undefined;
          // this.messageService.success(`Successfully deleted user: ${u.username}`);
        },
        // err => this.messageService.error(err)
    );
    this.refresh();
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
