import { Injectable } from '@angular/core';
import TODOS from './mock-todos';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoRepositoryService {
  private todos = TODOS;

  constructor() { }

  findAll() {
    return this.todos;
  }

  create(todo: Todo) {
    this.todos.push(todo);
  }

  update(todo: Todo) {
    const index = this.todos.findIndex(t => t.title === todo.title);
    this.todos[index] = todo;
  }

  remove(todo: Todo) {
    const index = this.todos.findIndex(t => t.title === todo.title);
    this.todos.splice(index, 1);
  }
}
