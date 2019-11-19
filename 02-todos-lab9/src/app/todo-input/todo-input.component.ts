import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'td-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {
  @Output() newTodo = new EventEmitter<Todo>();
  @ViewChild('todoInput', {static: true}) inputElem: ElementRef;
  history = '';

  constructor() { }

  ngOnInit() {
  }

  addTodo(text: string) {
    if  (text.length > 0) {
      this.newTodo.emit(new Todo(text));
    }
    // const elem = this.inputElem.nativeElement as HTMLInputElement;
    // if  (elem.value) {
    //   this.newTodo.emit(new Todo(elem.value));
    //   elem.value = '';
    // }
  }

  onKeyUp(event: KeyboardEvent) {
    this.history += ' | ' + (event.target as HTMLInputElement).value;
  }

}
