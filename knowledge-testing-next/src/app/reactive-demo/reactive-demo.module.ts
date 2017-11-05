/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Demo01Component } from './demo01/demo01.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Demo01Component],
  exports: [Demo01Component]
})
export class ReactiveDemoModule { }
