import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Angular Router</h1>
    <nav>
      <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/admin" routerLinkActive="active">Admin</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/