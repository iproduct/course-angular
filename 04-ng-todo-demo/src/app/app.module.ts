import { TodosRepositoryService } from './todos-repository.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { InjectionToken, NgModule, OpaqueToken } from '@angular/core';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { Todo } from './todo.model';
import TODO_MOCK_DATA from './todo-mock-data';
import { INITIAL_TODOS } from './constants';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoInputComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [
    TodosRepositoryService,
    LoggerService,
    { provide: INITIAL_TODOS, useValue: TODO_MOCK_DATA }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
