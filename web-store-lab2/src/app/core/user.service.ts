/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { Injectable } from "@angular/core";

import { BackendService } from "../core/backend.service";
import { LoggerService } from "../core/logger.service";
import { KeyType } from "../shared/common-types";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { User } from "../shared/user.model";

@Injectable()
export class UserService {
  constructor(private backend: BackendService, private logger: LoggerService) {}

  public findAll() {
    return this.backend.findAll(User);
  }

  public find(id: KeyType) {
    return this.backend.find(User, id);
  }

  public findByEmail(email: string): Observable<User> {
    return this.backend
      .findAll(User)
      .pipe(map(users => users.find(user => user.email === email)));
  }

  public add(user: User) {
    return this.backend.create(User, user);
  }

  public update(user: User) {
    return this.backend.update(User, user);
  }

  public remove(id: KeyType) {
    return this.backend.remove(User, id);
  }
}
