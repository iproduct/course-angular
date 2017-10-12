import { TodoRepositoryService } from '../todo-repository.service';
import { Component, OnInit } from '@angular/core';
import TODO_MOCK_DATA from '../todo-mock-data';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos = TODO_MOCK_DATA;

  constructor(public todoRepo: TodoRepositoryService) { }

  ngOnInit() {
  }

  completionChanged(todo: Todo) {
    this.todoRepo.remove(todo);
  }

  addTodo(todo: Todo) {
    this.todoRepo.add(todo);
  }
}
