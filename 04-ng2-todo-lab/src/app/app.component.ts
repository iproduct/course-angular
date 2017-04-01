import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  template: `
  <h2>My First Angular 2 App</h2>
  <app-todo></app-todo>
  `,
  styles: [`h2 {color: green;}`]
})
export class AppComponent { }
