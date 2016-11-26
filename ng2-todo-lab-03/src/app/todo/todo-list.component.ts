import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-list',
  template: `
  <section>
    Add todo:<todo-input (todo)="addTodo($event)"></todo-input>
  </section>
  <section *ngIf='todos.findAll().length'>
    <h3>Todo List</h3>
    <todo-item *ngFor="let todo of todos.findAll()" [todo]="todo"
      (onCompletionChange)="removeTodo(todo)" class="todo-item"></todo-item>
  </section>
  `,
  styles: [`
  .todo-item {display: block};
  `]
})
export class TodoListComponent implements OnInit {

  constructor(private todos: TodoService) { }

  ngOnInit() { }

  addTodo(todo: Todo) {
    this.todos.add(todo);
  }

  removeTodo(todo: Todo){
    this.todos.remove(todo);
  }
}
