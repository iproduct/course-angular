/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component } from '@angular/core';
import { Views } from './ui/nav-item/views';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'kt-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // viewHome = Views.HOME;
  // viewUsers =  Views.USERS;
  // viewTests =  Views.TESTS;
  // viewReactive = Views.REACTIVE;
  // viewWiki = Views.WIKI;

  title = 'Knowledge Tester';
  sidenavOpen = false;
  // currentView = Views.HOME;

  constructor(public authService: AuthService) {}

  openSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  chooseView() {
    // this.currentView = view;
    // console.log(Views[view]);
    this.sidenavOpen = false;
  }
}
