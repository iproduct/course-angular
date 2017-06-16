/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

// import { InMemoryDbService } from 'angular-in-memory-web-api';

import { User, Role } from '../users/user.model';
import { Identifiable } from '../shared/shared-types';
import { BackendService } from './backend.service';

const USERS: Identifiable[] = [
  new User('123456789abcdef012345678', 'john@abv.bg', 'John', 'Smith', 'john', Role.ADMIN),
  new User('123456789abcdef012345679', 'sara@abv.bg', 'Sara', 'Smith', 'sara', Role.INSTRUCTOR),
  new User('123456789abcdef012345680', 'vera@yahoo.com', 'Veronica', 'Simpson', 'vera', Role.STUDENT),
  new User('123456789abcdef012345681', 'brian@gmail.com', 'Brian', 'Harisson', 'brian', Role.STUDENT),
];

// export class InMemoryDataModel implements InMemoryDbService {
//   public createDb() {
//     return {
//       users: USERS
//     };
//   }
// }
