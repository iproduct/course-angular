import { Component, OnInit } from '@angular/core';

import { User, Role, Gender } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

const customerMaleImage = require('../../assets/img/customer_m.png');
const customerFemaleImage = require('../../assets/img/customer_f.png');
const operatorMaleImage = require('../../assets/img/operator_m.png');
const operatorFemaleImage = require('../../assets/img/operator_f.png');
const adminMaleImage = require('../../assets/img/admin_m.png');
const adminFemaleImage = require('../../assets/img/admin_f.png');

@Component({
  // moduleId: module.id,
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styles: [`
    .user {
      height: 45px;
      width: 350px;
    }
    .users .item-badge {
      height: 45px;
      font-size: 1.3em;
    }
    .user-icon {
      display: block;
      float: right;
    }
  `],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public selectedId: number = undefined;
  public selectedUser: User;

  public CUSTOMER_MALE = Role.CUSTOMER + Gender.MALE;
  public CUSTOMER_FEMALE = Role.CUSTOMER + Gender.FEMALE;
  public OPERATOR_MALE = Role.OPERATOR + Gender.MALE;
  public OPERATOR_FEMALE = Role.OPERATOR + Gender.FEMALE;
  public ADMIN_MALE = Role.ADMIN + Gender.MALE;
  public ADMIN_FEMALE = Role.ADMIN + Gender.FEMALE;

  public customerMaleImage = customerMaleImage;
  public customerFemaleImage = customerFemaleImage;
  public operatorMaleImage = operatorMaleImage;
  public operatorFemaleImage = operatorFemaleImage;
  public adminMaleImage = adminMaleImage;
  public adminFemaleImage = adminFemaleImage;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    this.route.params.do(params => console.log(JSON.stringify(params)))
      .forEach((params: Params) => {
        this.selectedId = +params['selectedId'];
        this.fetchUsers();
      });
    this.fetchUsers();
  }

  public selectItem(user: User) {
    this.selectedUser = user;
    this.selectedId = user.id;
    this.router.navigate(['/user', user.id]);
  }

  private fetchUsers() {
    this.service.getUsers().then( users => {
      console.log(JSON.stringify(users));
      this.users = users;
    });
  }


}
