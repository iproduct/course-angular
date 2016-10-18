import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <prod-list></prod-list>
  `
})
export class AppComponent {
  public product: string = 'DELL Laptop';
}
