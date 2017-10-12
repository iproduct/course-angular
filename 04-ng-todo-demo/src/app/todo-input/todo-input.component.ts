import { Todo } from '../todo.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() onTodo = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  addTodo(todoTitle: string) {
    todoTitle = todoTitle.trim();
    if (todoTitle.length > 0) {
      this.onTodo.emit(new Todo(todoTitle));
    }
  }

}
