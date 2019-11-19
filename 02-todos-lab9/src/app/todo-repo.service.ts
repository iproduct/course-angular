import { Injectable } from '@angular/core';
import { RepositoryImpl } from './repository';
import { Todo } from './todo.model';
import TODOS from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoRepoService extends RepositoryImpl<Todo> {

  constructor() {
    super();
    this.initData();
   }

   initData() {
    TODOS.forEach(td => this.create(td));
   }
}
