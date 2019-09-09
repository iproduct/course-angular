import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import TODOS from '../mock-todos';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[] = TODOS;

  constructor() { }

  ngOnInit() {
  }

  changeStatus(todo: Todo) {
    todo.completed = !todo.completed;
  }

}
