import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import TODOS from '../todo-mock-data';
import { TodoRepoService } from '../todo-repo.service';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private repo: TodoRepoService) { }

  ngOnInit() {
    this.todos = this.repo.findAll();
  }

  addTodo(todo: Todo) {
    this.repo.create(todo);
  }

  removeTodo(todo: Todo) {
    this.repo.remove(todo);
  }

  trackByTitle(index: number, todo: Todo): string { return todo.title; }

}
