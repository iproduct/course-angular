/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User, Role } from '../users/user.model';
import { Identifiable } from '../shared/shared-types';
import { BackendService } from './backend.service';
import { PRODUCTS, USERS } from './mock-data';


export class InMemoryDataModel implements InMemoryDbService {
  public createDb() {
    return {
      products: PRODUCTS,
      users: USERS
    };
  }
}
