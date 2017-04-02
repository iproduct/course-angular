import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TodoItemComponent } from './todo-item.component';
import { TodoService } from './todo.service';
import { TodoInputComponent } from './todo-input.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoInputComponent
  ],
  providers: [TodoService],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
