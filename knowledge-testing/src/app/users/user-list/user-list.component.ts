import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'kt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  currentUser = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.findAllUsers().then(users => this.currentUser = users[0]);
  }

}
