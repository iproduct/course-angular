import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  text = '';
  @Output() created = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    this.created.emit(new Todo(this.text) );
    this.text = '';
  }
}
