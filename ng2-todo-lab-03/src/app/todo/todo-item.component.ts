import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Todo } from './todo.model';

@Component({
  selector: 'todo-item',
  template: `
    <input type="checkbox" [(ngModel)]="todo?.completed" (change)="completionChanged()">
    {{todo.title}}
  `,
  styles: []
})
export class TodoItemComponent {
  @Input() todo: Todo;
  @Output() onCompletionChange = new EventEmitter<Todo>();

  completionChanged() {
    this.onCompletionChange.emit(this.todo);
  }


}
