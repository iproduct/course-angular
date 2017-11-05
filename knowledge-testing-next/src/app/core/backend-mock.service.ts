/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Injectable, Type } from '@angular/core';
import { Identifiable, IdentityType, ApplicationError } from '../shared/shared-types';
import { User, Role } from '../users/user.model';
import { BackendPromiseService } from './backend-promise.service';
import { LoggerService } from './logger.service';

const USERS: Identifiable[] = [
  new User('123456789abcdef012345678', 'john@abv.bg', 'John', 'Smith', 'john', Role.ADMIN),
  new User('123456789abcdef012345679', 'sara@abv.bg', 'Sara', 'Smith', 'sara', Role.INSTRUCTOR),
  new User('123456789abcdef012345680', 'vera@yahoo.com', 'Veronica', 'Simpson', 'vera', Role.STUDENT),
  new User('123456789abcdef012345681', 'brian@gmail.com', 'Brian', 'Harisson', 'brian', Role.STUDENT),
];


@Injectable()
export class BackendMockService implements BackendPromiseService {

  private nextId = 12345678;
  constructor(private logger: LoggerService) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType) {
    return Promise.resolve(this.findAll(type).then(
      items => items.filter(item => item.id === id)))[0];
  }

  findAll <T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case User.name:
        return Promise.resolve(USERS as T[]);
      default:
        return Promise.reject<T[]>(new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`));
    }
  }

  add <T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    switch (type.name) {
      case User.name:
        item.id = this.getNextId();
        USERS.push(item);
        this.logger.log(`User ${item.id} added successfully.`);
        return Promise.resolve(item);
      default:
        return Promise.reject<T>(new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`));
    }
  }
  edit <T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    switch (type.name) {
      case User.name:
        USERS.splice(USERS.findIndex(it => it.id === item.id), 1, item);
        return Promise.resolve(item);
      default:
        return Promise.reject<T>(new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`));
    }
  }
  delete <T extends Identifiable>(type: Type<T>, id: string): Promise<T> {
    switch (type.name) {
      case User.name:
        const index = USERS.findIndex(it => it.id === id);
        const deleted = <T[]> USERS.splice(index, 1);
        const deletedElem = (deleted.length > 0) ? deleted[0] : null;
        return Promise.resolve<T>(deletedElem);
      default:
        return Promise.reject<T>(new ApplicationError<T>(`Cannot recognize entity type: ${type.name}.`));
    }
  }

  private getNextId(): IdentityType {
    return '123456789abcdef0' + (this.nextId++);
  }

}
