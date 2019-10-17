import { Component } from '@angular/core';

@Component({
  selector: 'ws-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webstore-lab8';
  showSidenav = false;
  loggedIn = false;

  openSidenav() {
    this.showSidenav = true;
  }
  closeSidenav() {
    this.showSidenav = false;
  }
}
