import { Injectable } from '@angular/core';
import MOCK_TODOS from './mock-data';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService {
  private todos = MOCK_TODOS;

  constructor() { }

  findAll() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  remove(todo: Todo) {
    const index = this.todos.findIndex(td => td.title === todo.title);
    this.todos.splice(index, 1);
  }

  update(todo: Todo) {
    const index = this.todos.findIndex(td => td.title === todo.title);
    this.todos[index] = todo;
  }
}
