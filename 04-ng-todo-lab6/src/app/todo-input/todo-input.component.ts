import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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

  addTodo(todoText: string) {
    this.nextTodo.emit(new Todo(todoText));
  }

}
