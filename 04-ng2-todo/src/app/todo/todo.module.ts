import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';
import { TodoItemComponent } from './todo-item.component';
import { TodoInputComponent } from './todo-input.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [TodoListComponent, TodoItemComponent, TodoInputComponent],
  providers: [TodoService],
  exports: [TodoListComponent, TodoItemComponent, TodoInputComponent]
})
export class TodoModule { }
