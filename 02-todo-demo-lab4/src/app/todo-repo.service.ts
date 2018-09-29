import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import TODOS from './shared/todo-mock-data';
import { Todo } from './shared/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService {

  constructor(private logger: LoggerService) {}

  find() {
    return TODOS;
  }

  addTodo(todo: Todo) {
    const index =  TODOS.push(todo);
    this.logger.log(`TODO Created: ${todo}`);
  }

  deleteTodo(deleted: Todo) {
    const index =  TODOS.findIndex(todo => todo.title === deleted.title);
    TODOS.splice(index, 1);
    this.logger.log(`TODO Deleted: ${deleted}`);
  }

}
