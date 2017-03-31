import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-input',
  template: `
    <input type="text" #todo (keyup.enter)="addTodo(todo.value); todo.value=''"
      (blur)="addTodo(todo.value); todo.value=''">
    <button (click)="addTodo(todo.value); todo.value=''">Add</button>
  `,
  styles: []
})
export class TodoInputComponent {
  //   title: string;
  @Output('todo') onTodo = new EventEmitter<Todo>();

  addTodo(todoValue: string) {
    todoValue = todoValue.trim();
    if (todoValue.length > 0) {
      this.onTodo.emit(new Todo(todoValue, false));
      // this.title = '';
    }
  }

  onKey($event: KeyboardEvent) {
    this.onTodo.emit(new Todo((event.target as HTMLInputElement).value, false));
  }

}
