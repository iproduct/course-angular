import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() nextTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  addTodo(text: string) {
    if (text.trim().length > 0) {
      this.nextTodo.emit(new Todo(text));
    }
  }

}
