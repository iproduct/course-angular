import { Component, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'kt-login',
  template: `
    <h2 *ngIf="!inToolbar">LOGIN</h2>
    <div>{{message}}</div>
    <form *ngIf="!authService.isLoggedIn" #loginForm="ngForm" (ngSubmit)="login(loginForm)">
      <input ngModel id="email" name="email" placeholder="Email" email />
      <input ngModel id="password" name="password" placeholder="Password" required/>
      <button type="submit" [disabled]="!loginForm.form.valid">Login</button>
      <!--{{ loginForm.value | json}} -->
    </form>
    <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>`
})
export class LoginComponent {
  @Input() inToolbar = false;
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(loginForm: NgForm) {
    const { email, password }  = loginForm.form.value;
    this.message = 'Trying to log in ...';

    this.authService.login(email, password).subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        const navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve'
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
    this.router.navigate(['/']);
  }
}
