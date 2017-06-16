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

import { User } from './user.model';
import { BackendService } from '../core/backend.service';
import { Logger } from '../core/logger.service';
import { BackendPromiseService } from '../core/backend-promise.service';

@Injectable()
export class UserPromiseService {

  constructor(
    private backend: BackendPromiseService,
    private logger: Logger) { }

  public getUsers(): Promise<User[]> {
    return this.backend.findAll(User).then(
      users => {
        this.logger.log(`Fetched ${users.length} users.`);
        return users;
      });
  }

  public getUser(id: string): Promise<User> {
    return this.backend.find(User, id);
  }

  public addUser(user: User): Promise<User> {
    return this.backend.add(User, user);
  }

  public editUser(user: User): Promise<User> {
    return this.backend.edit(User, user);
  }

  public deleteUser(userId: string): Promise<User> {
    return this.backend.delete(User, userId);
  }
}
