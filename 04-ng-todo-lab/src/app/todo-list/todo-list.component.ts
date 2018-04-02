import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import TODOS from '../todo-mock-data';

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

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter( td => td.title !== todo.title );
  }

}
