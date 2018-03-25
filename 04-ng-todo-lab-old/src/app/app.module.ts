import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoRepoService } from './todo-repo.service';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    TodoInputComponent
],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TodoRepoService, LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
