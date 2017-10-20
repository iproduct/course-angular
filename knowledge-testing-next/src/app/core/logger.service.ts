/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class LoggerService {

  constructor() { }

  public log(msg: any) {
    if (isDevMode()) {
      console.log(msg);
    }
  }
  public error(msg: any) {
    if (isDevMode()) {
      console.error(msg);
    }
  }
  public warn(msg: any) {
    if (isDevMode()) {
      console.warn(msg);
    }
  }

}
