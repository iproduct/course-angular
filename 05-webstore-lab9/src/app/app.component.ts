import { Component } from '@angular/core';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Webstore Lab';
  showSidenav = false;
  loggedIn = false;

  openSidenav() {
    this.showSidenav = true;
  }
  closeSidenav() {
    this.showSidenav = false;
  }
}
