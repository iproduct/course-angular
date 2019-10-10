import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo, TodoStatus } from '../todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() statusChanged = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  onComplete() {
    this.todo.status = TodoStatus.COMPLETED;
    this.statusChanged.emit(this.todo);
  }

  onCancel() {
    this.todo.status = TodoStatus.CANCELED;
    this.statusChanged.emit(this.todo);
  }

  getStatusText(status: TodoStatus): string {
    return TodoStatus[status];
  }

}
