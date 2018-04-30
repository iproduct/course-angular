/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Component, OnInit } from "@angular/core";

import { User, Role, Gender } from "./user.model";
import { UserService } from "./user.service";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { tap } from "rxjs/operators";
import { KeyType } from '../shared/common-types';

const customerMaleImage = "../../assets/img/customer_m.png";
const customerFemaleImage = "../../assets/img/customer_f.png";
const operatorMaleImage = "../../assets/img/operator_m.png";
const operatorFemaleImage = "../../assets/img/operator_f.png";
const adminMaleImage = "../../assets/img/admin_m.png";
const adminFemaleImage = "../../assets/img/admin_f.png";

@Component({
  // moduleId: module.id,
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
  providers: [UserService]
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public selectedId: KeyType = undefined;
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
    private router: Router
  ) {}

  public ngOnInit() {
    this.route.params
      .pipe(tap(params => console.log(JSON.stringify(params))))
      .subscribe((params: Params) => {
        this.selectedId = params["selectedId"];
        this.fetchUsers();
      });
  }

  public getRoleAsString(role: Role) {
    return Role[role];
  }

  public selectItem(user: User) {
    this.selectedUser = user;
    this.selectedId = user.id;
    this.router
      .navigate([".", { selectedId: user.id }], { replaceUrl: true })
      .then(isSucces => this.router.navigate(["/users", user.id]));
  }

  public addUser() {
    this.router.navigate(["/users/new"]);
  }

  public deleteItem(id: KeyType) {
    this.service.remove(id).subscribe(deleted => {
      this.fetchUsers();
    });
  }

  private fetchUsers() {
    this.service
      .findAll()
      .subscribe(users => {
        this.users = users;
      },err => console.error(err));
  }
}
