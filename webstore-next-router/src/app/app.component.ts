import { Component } from '@angular/core';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showSidenav = false;
  loggedIn = false;
  constructor() {}

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
