/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import {Router, ActivatedRoute,  RouterModule} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-route-not-found',
  templateUrl: './route-not-found.component.html',
  styleUrls: ['./route-not-found.component.css']
})
export class RouteNotFoundComponent implements OnInit {

  constructor(public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    // this.route.url.subscribe(urlSegments => urlSegments.concat('/'));
    // const temp = this.router.routerState.snapshot.url;
  }

}
