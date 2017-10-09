import { Component, OnInit } from '@angular/core';
import { Message } from './demo/message.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello from Angular 2!';
  todo: Message = {message: 'From Parent TODO.'};

  ngOnInit() {
  }

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.todo.message = 'Do something Other - TODO Changed!';
  //   }, 3000);
  // }
  // updateTodo(event) {
  //   this.todo.message = event;
  // }
}

