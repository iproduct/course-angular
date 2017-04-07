import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <main class="container-fluid">
  <section class="row">
    <prod-list></prod-list>
  </section>
  <section class="row">
    <sales-tax></sales-tax>
  </section>
  <section class="row">
    <form-demo></form-demo>
  </section>
  </main>
  `
})
export class AppComponent {
}
