import { Component, OnInit } from '@angular/core';

import { Todo } from './shared/todo.model';
import { TodoRepoService } from './todo-repo.service';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'TODO Manager Demo';
  todos;

  constructor(private service: TodoRepoService) {}

  ngOnInit(): void {
    this.todos = this.service.find();
  }

  deleteTodo(todo: Todo) {
    this.service.deleteTodo(todo);
  }
}
