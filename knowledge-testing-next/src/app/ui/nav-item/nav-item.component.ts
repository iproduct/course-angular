/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Views } from './views';

@Component({
  selector: 'kt-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent implements OnInit {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink = '';
  @Output() activate = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
