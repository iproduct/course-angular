import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatus } from '../todo.model';
import { TodoRepositoryService } from '../todo-repository.service';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private repo: TodoRepositoryService) { }

  ngOnInit() {
    this.todos = this.repo.findAll();
  }

  changeStatus(todo: Todo) {
    this.repo.update(todo);
    if (todo.status === TodoStatus.CANCELED) {
      this.repo.remove(todo);
    }
    this.todos = this.repo.findAll();
  }

  todoAdded(todo: Todo) {
    this.repo.create(todo);
    this.todos = this.repo.findAll();
  }

}
