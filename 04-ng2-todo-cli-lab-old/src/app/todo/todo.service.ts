import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import mockTodos from './todo-mock-data';

@Injectable()
export class TodoService {
  private todos: Todo[] = mockTodos;

  constructor() { }

  add(todo: Todo) {
    this.todos = [...this.todos, todo];
  }

  removeTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.title !== todo.title);
  }

  find(todoId: number) {
    return this.todos.find(t => t.id === todoId);
  }

  findAll() {
    return this.todos;
  }


}
