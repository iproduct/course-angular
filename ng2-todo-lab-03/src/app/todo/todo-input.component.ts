import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-input',
  template: `
    <input type="text" [(ngModel)]="title">
    <button (click)="addTodo()">Add</button>
  `,
  styles: []
})
export class TodoInputComponent {
  title: string;
  @Output('todo') onTodo = new EventEmitter<Todo>();

  addTodo() {
    this.onTodo.emit(new Todo(this.title, false));
    this.title = '';
  }

}
