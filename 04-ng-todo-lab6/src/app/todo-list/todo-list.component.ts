import { Component, OnInit } from '@angular/core';
import MOCK_TODOS from '../mock-data';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos = MOCK_TODOS;

  constructor() { }

  ngOnInit() {
  }

  changeStatus(todo: Todo) {
    const index = this.todos.findIndex(td => td.title === todo.title);
    this.todos.splice(index, 1);
  }

}
