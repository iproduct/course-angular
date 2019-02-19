import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  log = '';
  @Output() created = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  addTodo(text) {
    text = text.trim();
    if (text.length > 0) {
      this.created.emit(new Todo(text) );
    }
    // this.text = '';
  }

  // onKey(event: KeyboardEvent) {
  //   this.log += (event.target as HTMLInputElement).value + ' | ';
  // }
}
