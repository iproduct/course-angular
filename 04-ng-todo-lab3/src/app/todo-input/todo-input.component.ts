import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  todoText = '';

  @Output() nextTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    const text = this.todoText.trim();
    if (text.length > 0) {
      this.nextTodo.emit(new Todo(text));
      this.todoText = '';
    }
  }

  // onKey(event: KeyboardEvent) {
  //   this.todoText = (<HTMLInputElement>event.target).value;
  // }
}
