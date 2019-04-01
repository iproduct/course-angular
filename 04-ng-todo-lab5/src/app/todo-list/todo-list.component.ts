import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo.model';
import { TodoRepoService } from '../shared/todo-repo.service';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todos: Todo[];

  constructor(private repo: TodoRepoService) { }

  ngOnInit() {
    this.todos = this.repo.findAll();
  }

  removeTodo(todo: Todo) {
    this.repo.removeTodo(todo);
  }

  todoCreated(todo: Todo) {
    this.repo.addTodo(todo);
  }

  trackId(index: number, todo: Todo): string {
    return todo.title;
  }

}
