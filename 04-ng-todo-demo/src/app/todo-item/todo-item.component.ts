import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() onCompletionChange = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  completionChanged() {
    this.onCompletionChange.emit(this.todo);
  }

}
