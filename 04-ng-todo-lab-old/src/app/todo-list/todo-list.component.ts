import { Component, OnInit } from '@angular/core';
import { TodoRepoService } from '../todo-repo.service';
import { Todo } from '../todo.model';


@Component({
  selector: 'td-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(public todoRepo: TodoRepoService) { }

  ngOnInit() {
  }

  addTodo(todo: Todo) {
    this.todoRepo.create(todo);
  }

  removeTodo(todo: Todo) {
    this.todoRepo.remove(todo);
  }

}
