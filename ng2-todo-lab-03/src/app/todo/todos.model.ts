import { Todo } from './todo.model';

export class Todos {
  private todos: Todo[] = [];

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