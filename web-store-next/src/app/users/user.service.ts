import { Injectable } from "@angular/core";

import { BackendService } from "../core/backend.service";
import { User } from "./user.model";
import { LoggerService } from "../core/logger.service";
import { KeyType } from "../shared/common-types";
import { map } from "rxjs/operators";
import { Observable } from "rxjs/Observable";

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
    return this.backend.add(User, user);
  }

  public update(user: User) {
    return this.backend.update(User, user);
  }

  public remove(id: KeyType) {
    return this.backend.remove(User, id);
  }
}
