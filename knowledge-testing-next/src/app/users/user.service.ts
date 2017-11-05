import { Injectable } from '@angular/core';
import { LoggerService } from '../core/logger.service';
import { User } from './user.model';
import { IdentityType } from '../shared/shared-types';
import { BackendService } from '../core/backend.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

export class UserService {

  constructor(private logger: LoggerService, private backend: BackendService) {
  }

  findAllUsers(): Observable<User[]> {
    return this.backend.findAllWithRefresh(User);
  }

  refreshUsers() {
    this.backend.refresh(User);
  }

  findUser(id: IdentityType): Observable<User> {
    return this.backend.find(User, id);
  }

  findUserByEmail(email: string): Observable<User> {
    return this.backend.findAll(User).map(users => users.find(user => user.email === email));
  }

  addUser(user: User) {
    return this.backend.add(User, user);
  }

  editUser(user: User) {
    return this.backend.edit(User, user);
  }

  deleteUser(userId: IdentityType) {
    return this.backend.delete(User, userId);
  }

}
