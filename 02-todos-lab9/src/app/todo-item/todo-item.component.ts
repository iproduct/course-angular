import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoStatus, Todo } from '../todo.model';

@Component({
  selector: 'td-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Input() index: number;
  @Output() statusChange = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  getStatusText(status: TodoStatus) {
    return TodoStatus[status];
  }

  onComplete() {
    this.todo.status = TodoStatus.COMPLETED;
    this.statusChange.emit(this.todo);
  }

  onCancel() {
    this.todo.status = TodoStatus.CANCELED;
    this.statusChange.emit(this.todo);
  }
}
