/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Component, OnInit, HostBinding } from '@angular/core';
import { slideInDownAnimation } from '../../shared/animations';

@Component({
  selector: 'kt-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css'],
  animations: [slideInDownAnimation]
})
export class TestListComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
