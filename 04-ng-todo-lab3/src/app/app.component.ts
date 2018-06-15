import { Component } from '@angular/core';
import { Todo } from './todo.model';
import { TodoRepoService } from './todo-repo.service';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO Manager';

  constructor(public repo: TodoRepoService) {}

}
