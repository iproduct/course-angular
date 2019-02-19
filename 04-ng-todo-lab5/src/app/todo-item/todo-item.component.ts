import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() completed = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  changeCompletion(completed) {
    this.todo.completed = completed;
    this.completed.emit(this.todo);
  }

}
