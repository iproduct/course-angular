import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }