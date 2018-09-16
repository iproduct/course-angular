import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input() todos: Todo[];
  @Output() completionChanged = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  changeCompletion(todo: Todo) {
    this.completionChanged.emit(todo);
  }

}
