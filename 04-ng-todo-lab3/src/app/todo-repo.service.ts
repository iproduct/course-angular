import { Injectable } from '@angular/core';
import TODOS from './todo-mock-data';
import { Todo } from './todo.model';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService {
  todos = TODOS;

  constructor(private logger: LoggerService) { }

  find() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.logger.log(`TODO Created: ${todo}`);
  }

  removeTodo(event: Todo) {
    const index = this.todos.findIndex(todo => todo.title === event.title);
    this.todos.splice(index, 1);
    this.logger.log(`TODO Removed: ${event}`);
  }


}
