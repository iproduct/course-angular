import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import mockTodos from './todo-mock-data';
import { TodoService } from './todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = mockTodos;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todos = this.todoService.findAll();
  }

  addTodo(todo: Todo) {
   this.todoService.add(todo);
   this.todos = this.todoService.findAll();
  }

  removeTodo(todo: Todo) {
   this.todoService.removeTodo(todo);
   this.todos = this.todoService.findAll();
  }

}
