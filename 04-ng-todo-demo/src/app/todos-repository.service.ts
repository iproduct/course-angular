import { LoggerService } from './logger.service';
import { Inject, Injectable } from '@angular/core';
import TODO_MOCK_DATA from './todo-mock-data';
import { Todo } from './todo.model';
import { INITIAL_TODOS } from './constants';

@Injectable()
export class TodosRepositoryService {
  private todos = [];

  constructor(private logger: LoggerService, /*@Inject(INITIAL_TODOS) initialTodos: Todo[]*/) {
    // this.todos = initialTodos;
  }

  add(todo: Todo) {
    this.todos.push(todo);
    this.logger.log(`Adding new Todo: ${JSON.stringify(todo)}`);
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.logger.log(`Removin Todo: ${JSON.stringify(todo)}`);
  }

  find(index: number) {
    return this.todos[index];
  }

  findAll() {
    return this.todos;
  }
}
