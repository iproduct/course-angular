/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
  public log(msg: any)   { console.log(msg); }
  public error(msg: any) { console.error(msg); }
  public warn(msg: any)  { console.warn(msg); }
}
