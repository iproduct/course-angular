import { Injectable } from '@angular/core';

import { User } from './user.model';
import { BackendService } from '../common/backend.service';
import { Logger } from '../common/logger.service';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public getUsers() {
    this.backend.getAll(User).then( (users: User[]) => {
      this.logger.log(`Fetched ${users.length} users.`);
      this.users.push(...users); // fill cache
    }).catch(
      err => this.logger.error(`UserService Error: ` + err)
    );
    return this.users;
  }
}
