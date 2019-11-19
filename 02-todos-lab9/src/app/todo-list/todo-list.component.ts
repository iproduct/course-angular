import { Component, OnInit } from '@angular/core';
import { TodoStatus, Todo } from '../todo.model';
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
    this.refresh();
  }

  refresh() {
    this.todos = this.repo.findAll();
  }

  statusChanged(todo: Todo) {
    if (todo.status === TodoStatus.CANCELED) {
      this.repo.deleteById(todo.id);
    } else {
      this.repo.update(todo);
    }
    this.refresh();
  }

  addTodo(todo: Todo) {
    this.repo.create(todo);
    this.refresh();
  }

}
