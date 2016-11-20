import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello from Angular 2!';
  todo = 'From Parent TODO.';

  ngOnInit() {
    setTimeout(() => {
      this.todo = 'Do something Other - TODO Changed!';
    }, 3000);
  }
  updateTodo(event) {
    this.todo = event;
  }
}

