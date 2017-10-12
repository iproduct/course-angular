import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable()
export class TodoRepositoryService {
  private todos: Todo[] = [];

  constructor() { }

  add(todo: Todo) {
    this.todos.push(todo);
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  find(index: number): Todo {
    return this.todos[index];
  }

  findAll(): Todo[] {
    return this.todos;
  }

}
