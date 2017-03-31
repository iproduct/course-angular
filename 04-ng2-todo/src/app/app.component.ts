import { Component, OnInit } from '@angular/core';

export interface Message {
  message: string;
}

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular 2 TODO Demo';
  todo: Message = {
    message: 'My First TODO.'
  };

  ngOnInit() { }

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.todo.message = 'Do something Other - TODO Changed!';
  //   }, 3000);
  // }
  updateTodo(event: string) {
    this.todo.message = event;
  }
}

