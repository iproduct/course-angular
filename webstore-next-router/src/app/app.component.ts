import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSidenav = false;
  loggedIn = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(authResult => this.loggedIn = !!authResult);
  }

  closeSidenav() {
    this.showSidenav = false;
  }

  openSidenav() {
    this.showSidenav = true;
  }

  logout() {
    this.closeSidenav();
    this.loggedIn = false;
  }

}
