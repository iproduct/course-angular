import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodosRepositoryService } from '../todos-repository.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  // todos = TODO_MOCK_DATA;

  constructor(public todosService: TodosRepositoryService) { }

  ngOnInit() {
  }

  addTodo(todo: Todo) {
    this.todosService.add(todo);
  }

  removeTodo(todo: Todo) {
    // this.todos = this.todos.filter( t =>  t !== todo );
    this.todosService.remove(todo);
  }

}
