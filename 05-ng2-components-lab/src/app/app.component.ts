import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <div class="container-fluid">
      <img [src]="logo" alt="Test image">
      <!--<simple-form></simple-form>-->
      <user-list></user-list>
      <product-list></product-list>
      <sales-tax></sales-tax>
    </div>
  `
})
export class AppComponent {
  public logo = require('../assets/img/test.png');
}
