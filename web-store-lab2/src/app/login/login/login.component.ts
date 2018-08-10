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

import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { map, distinct, filter, delay } from 'rxjs/operators';

@Component({
  selector: 'ws-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Input() inToolbar = false;

  message: string;
  redirectUrl: string;
  errorMessage: string;

  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      map(paramMap => paramMap.get('url')),
      distinct()
    ).subscribe(url => this.redirectUrl = url);

    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('logout')),
      filter(isLogout => isLogout === 'true'),
      delay(0) // necessary to postpone logout after views updates finished
    ).subscribe(isLogout => this.logout());
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

  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
