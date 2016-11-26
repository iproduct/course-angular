import { Component, OnInit } from '@angular/core';
import { Todos } from './todos.model';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-list',
  template: `
  <section>
    Add todo:<todo-input (todo)="addTodo($event)"></todo-input>
  </section>
  <section *ngIf='todos.findAll().length'>
    <h3>Todo List</h3>
    <todo-item *ngFor="let todo of todos.findAll()" [todo]="todo"></todo-item>
  </section>
  `,
})
export class TodoListComponent implements OnInit {
  private todos: Todos;

  constructor() { }

  ngOnInit() { }

  addTodo(todo: Todo) {
    this.todos.add(todo);
  }
}
