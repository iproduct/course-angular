import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  title = '';
  @Output('onTodoAdded') onTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  createTodo() {
    const text = this.title.trim();
    if (text.length > 0) {
      this.onTodo.emit(new Todo(0, text));
      this.title = '';
    }
  }

}
