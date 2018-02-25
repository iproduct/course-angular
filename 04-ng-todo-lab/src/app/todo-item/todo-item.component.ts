import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() completionChanged = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  completionChange() {
    this.completionChanged.emit(this.todo);
  }

}
