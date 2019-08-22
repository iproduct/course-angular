import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo.model';
import { TodoRepoService } from '../todo-repo.service';

@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];

  constructor(private todoRepo: TodoRepoService) {}

  ngOnInit() {
    this.todos = this.todoRepo.findAll();
  }

  changeStatus(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoRepo.update(todo);
  }

  addTodo(todo: Todo) {
    this.todoRepo.addTodo(todo);
  }

}
