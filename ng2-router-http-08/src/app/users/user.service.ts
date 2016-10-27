import { Injectable } from '@angular/core';

import { User } from './user.model';
import { BackendService } from '../common/backend.service';
import { Logger } from '../common/logger.service';

@Injectable()
export class UserService {

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public getUsers() {
    return this.backend.findAll(User).then(
      users => {
        this.logger.log(`Fetched ${users.length} users.`);
        return users;
      });
  }
}
