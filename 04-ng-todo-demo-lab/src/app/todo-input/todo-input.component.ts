import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  // tslint:disable-next-line:no-output-rename
  @Output('onTodo') todoEmitter = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  // onKeyUp(event: KeyboardEvent) {
  //   this.text = (event.target as HTMLInputElement).value;
  // }

  onNewTodo(text: string) {
    text = text.trim();
    if (text.length > 0) {
      this.todoEmitter.emit(new Todo(text));
    }
  }
}
