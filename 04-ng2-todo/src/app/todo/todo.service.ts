import {Injectable} from '@angular/core';
import { Todo } from './todo.model';
import mockTodos from './todo-mock-data';

@Injectable()
export class TodoService {
  private todos: Todo[] = mockTodos;

  add(todo: Todo) {
    this.todos.push(todo);
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  find(index: number) {
    return this.todos[index];
  }

  findAll() {
    return this.todos;
  }

}