import { Component } from '@angular/core';
import TODOS from './shared/todo-mock-data';
import { Todo } from './shared/todo.model';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO Manager Demo';
  todos = TODOS;

  deleteTodo(deleted: Todo) {
    const index =  TODOS.findIndex(todo => todo.title === deleted.title);
    TODOS.splice(index, 1);
  }
}
