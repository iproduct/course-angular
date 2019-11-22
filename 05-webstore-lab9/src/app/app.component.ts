import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webstore Lab';
  showSidenav = false;
  loggedIn = false;

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe( authResult => this.loggedIn = authResult && authResult.auth);
  }

  openSidenav() {
    this.showSidenav = true;
  }
  closeSidenav() {
    this.showSidenav = false;
  }
}
