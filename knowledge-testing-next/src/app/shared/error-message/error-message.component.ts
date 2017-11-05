/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

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
