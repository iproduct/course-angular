import { Component, OnInit } from '@angular/core';
import { TodoRepoService } from '../todo-repo.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  // todoText = '';
  // logValues = '';

  constructor(private service: TodoRepoService) { }

  ngOnInit() {
  }

  addTodo(title: string) {
    if (title.length > 0) {
      this.service.addTodo(new Todo(title));
    }
  }

  // addTodo(event: KeyboardEvent) {
  //   this.service.addTodo(new Todo((<HTMLInputElement> event.target).value));
  // }

  // onKeyUp(keyEvent: KeyboardEvent) {
  //   this.logValues += (<HTMLInputElement> keyEvent.target).value + ' | ';
  // }

}
