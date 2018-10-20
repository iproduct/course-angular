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
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

export abstract class BackendService {
  abstract find: <T extends Identifiable> (type: Type<T>, id: IdentityType) => Observable<T>;
  abstract findAll <T extends Identifiable>(type: Type<T>): Observable<T[]>;
  abstract findAllWithRefresh<T extends Identifiable>(type: Type<T>): Observable<T[]>;
  abstract refresh<T extends Identifiable>(type: Type<T>): void;
  abstract add <T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
  abstract edit <T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
  abstract delete <T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T>;
}
