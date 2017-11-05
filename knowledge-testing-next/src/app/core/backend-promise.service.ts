/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { IdentityType, Identifiable } from '../shared/shared-types';
import { Type } from '@angular/core';

export abstract class BackendPromiseService {
  abstract find: <T extends Identifiable> (type: Type<T>, id: IdentityType) => Promise<T>;
  abstract findAll <T extends Identifiable>(type: Type<T>): Promise<T[]>;
  abstract add <T extends Identifiable>(type: Type<T>, item: T): Promise<T>;
  abstract edit <T extends Identifiable>(type: Type<T>, item: T): Promise<T>;
  abstract delete <T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T>;
}
