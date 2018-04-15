import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import TODOS from './todo-mock-data';
import { Todo } from './todo.model';

@Injectable()
export class TodoRepoService {
  private todos = TODOS;

  constructor(private logger: LoggerService) { }

  findAll() {
    return this.todos;
  }

  create(todo: Todo) {
    this.todos.push(todo);
    this.logger.log(`Todo '${todo.title}' created. `);
  }

  remove(todo: Todo) {
    this.todos.splice(
      this.todos.findIndex(item => item === todo), 1);
    this.logger.log(`Todo '${todo.title}' removed.`);
  }

}
