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
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { take, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from './user.service';
import { User } from './user.model';

@Injectable()
export class UserResolver implements Resolve<User | undefined> {
  constructor(private service: UserService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot) {
    const id = route.params['userId'];
    return this.service.findById(id).pipe(
      take(1),
      map(user => {
        if (user) {
          return user;
        } else { // id not found
            this.router.navigate(['/users']);
            return undefined;
        }
      }),
      catchError(() => {
        this.router.navigate(['/users']);
        return throwError(`User with ID:${id} not found.`);
      })
    );
  }
}
