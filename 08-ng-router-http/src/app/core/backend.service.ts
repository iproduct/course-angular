/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Type } from '@angular/core';
import { Identifiable, IdentityType } from '../shared/shared-types';
import { Observable } from 'rxjs/Observable';

export abstract class BackendService {

  public findAll: <T extends Identifiable>(type: Type<T>) => Observable<T[]>;

  public abstract find<T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T>;

  public abstract add<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract edit<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract delete<T extends Identifiable>(type: Type<T>, itemId: IdentityType): Observable<T>;

}
