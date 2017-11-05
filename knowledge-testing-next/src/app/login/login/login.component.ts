/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { asap } from 'rxjs/scheduler/asap.js';

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  redirectUrl: string;
  errorMessage: string;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap
      .map(paramMap => paramMap.get('url'))
      .distinct()
      .subscribe(url => this.redirectUrl = url);

    this.route.paramMap
      .map(paramMap => paramMap.get('logout'))
      .filter(isLogout => isLogout === 'true')
      .delay(0) // necessary to postpone logout after views updates finished
      .subscribe(isLogout => this.logout());
  }

  login(loginForm: NgForm) {
    const { email, password }  = loginForm.form.value;

    this.authService.login(email, password).subscribe(success => {
      if (success && this.authService.isUserLoggedIn()) {
        this.errorMessage = '';
        this.message = this.authService.getSalutation();
        if ( this.redirectUrl ) {
          this.router.navigate([this.redirectUrl]) // redirect user to initially requested url
            .then(() => this.redirectUrl = undefined);
        }
      } else {
        this.errorMessage = 'Invalid username or password. Please try again.';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = undefined;
    this.router.navigate(['/']);
  }
}
