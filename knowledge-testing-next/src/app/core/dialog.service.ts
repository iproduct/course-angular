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
/**
 * Asyncronous modal dialog service
 */
@Injectable()
export class DialogService {
  /**
   * Ask user to confirm an action.
   * @param `message` the confirmation message to show
   * @return promise of confirmation resolution (true=confirm or false=cancel)
   */
  confirm(message?: string) {
    return new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'OK?'));
    });
  }
}
