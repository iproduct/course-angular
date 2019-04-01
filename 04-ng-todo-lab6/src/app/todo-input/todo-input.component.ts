import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() nextTodo = new EventEmitter<Todo>();

  value = '';

  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    if (this.value) {
      this.nextTodo.emit(new Todo(this.value));
      this.value = '';
    }
  }

  onKey(keyEvent: KeyboardEvent) {
    this.value = (keyEvent.target as HTMLInputElement).value;
  }

}
