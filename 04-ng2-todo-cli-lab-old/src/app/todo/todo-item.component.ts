import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onCompletionChange: EventEmitter<Todo> =
    new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  completionChanged() {
    this.onCompletionChange.emit(this.todo);
  }

}
