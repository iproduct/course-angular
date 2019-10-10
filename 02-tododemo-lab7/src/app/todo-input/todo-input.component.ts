import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<Todo>();
  @ViewChild('inputElem', {static: true}) inputElem: ElementRef;

  title = '';
  history = '';

  constructor() { }

  ngOnInit() {
  }

  addTodo() {
    this.newTodo.emit(new Todo(this.inputElem.nativeElement.value));
    this.inputElem.nativeElement.value = '';
    // this.title = '';
  }

  keyPressed(event: KeyboardEvent) {
    this.title = (event.target as HTMLInputElement).value;
    this.history += ' | ' + this.title;
  }
}
