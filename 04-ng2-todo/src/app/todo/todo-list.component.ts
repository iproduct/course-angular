import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import mockTodos from './todo-mock-data';



@Component({
  selector: 'todo-list',
  template: `
  <section>
    Add todo:<todo-input (todo)="addTodo($event)"></todo-input>
  </section>
  <section *ngIf='todos.findAll().length'>
    <h3>Todo List</h3>
    <!--<ul>
      <li *ngFor="let todo of todos" class="todo-item">{{todo.title}} - {{todo.completed ? '' : 'Not '}} completed</li>
    </ul>-->
    <todo-item *ngFor="let todo of todos.findAll()" [todo]="todo"
      (onCompletionChange)="removeTodo(todo)" class="todo-item"></todo-item>
  </section>
  `,
  styles: [`
  .todo-item {
    display:block;
  };
  `]
})
export class TodoListComponent implements OnInit {
  // todos: Todo[] = mockTodos;
  constructor(private todos: TodoService) { }

  ngOnInit() { }

  addTodo(todo: Todo) {
    this.todos.add(todo);
  }

  removeTodo(todo: Todo){
    this.todos.remove(todo);
  }
}
