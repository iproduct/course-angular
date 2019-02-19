import { Injectable } from '@angular/core';
import TODOS from '../shared/todo-mock-data';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService {
  private todos = TODOS;

  constructor() { }

  findAll() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
  }

  removeTodo(todo: Todo) {
    const index = this.todos.findIndex( t => t.title === todo.title);
    this.todos.splice(index, 1);
  }

}
