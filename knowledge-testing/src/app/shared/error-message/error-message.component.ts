import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ErrorType } from '../shared-types';

@Component({
  selector: 'kt-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})

export class ErrorMessageComponent implements OnInit, OnChanges {
  @Input() message = '';
  @Input() type: ErrorType = ErrorType.ERROR;

  classes = {};

  constructor() {
  }

  ngOnInit() {
    this.resetClasses();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.resetClasses();
    }
  }

  resetClasses() {
    this.classes = {
      'error': this.type === ErrorType.ERROR,
      'warning': this.type === ErrorType.WARNING
    };
  }

}
