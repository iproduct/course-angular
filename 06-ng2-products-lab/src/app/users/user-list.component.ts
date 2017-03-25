import { Component, OnInit } from '@angular/core';

import { User, Role, Gender } from './user.model';
import { UserService } from './user.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

// const customerMaleImage = require('../../assets/img/customer_m.png');
// const customerFemaleImage = require('../../assets/img/customer_f.png');
// const operatorMaleImage = require('../../assets/img/operator_m.png');
// const operatorFemaleImage = require('../../assets/img/operator_f.png');
// const adminMaleImage = require('../../assets/img/admin_m.png');
// const adminFemaleImage = require('../../assets/img/admin_f.png');

@Component({
  // moduleId: module.id,
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
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

  customerMaleImage = '/assets/img/customer_m.png';
  customerFemaleImage = '/assets/img/customer_f.png';
  operatorMaleImage = '/assets/img/operator_m.png';
  operatorFemaleImage = '/assets/img/operator_f.png';
  adminMaleImage = '/assets/img/admin_m.png';
  adminFemaleImage = '/assets/img/admin_f.png';


  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    this.fetchUsers();
    this.route.params.do(params => console.log(JSON.stringify(params)))
      .forEach((params: Params) => {
        this.selectedId = +params['selectedId'];
        this.fetchUsers();
      });
  }

  public getRoleAsString(role: Role) {
    return Role[role];
  }

  public selectItem(user: User) {
    this.selectedUser = user;
    this.selectedId = user.id;
    this.router.navigate(['.', { selectedId: user.id }], { replaceUrl: true })
      .then(isSucces => this.router.navigate(['/user', user.id]));
  }

  public addUser() {
    this.router.navigate(['/user']);
  }

  public deleteItem(itemId: number) {
    this.service.deleteUser(itemId).then(deleted => {
      this.fetchUsers();
    });
  }

  private fetchUsers() {
    this.service.getUsers().then(users => {
      this.users = users;
    });
  }


}
