import { Injectable } from '@angular/core';

import { User } from './user.model';
import { BackendService } from '../common/backend.service';
import { Logger } from '../common/logger.service';
import { BackendPromiseService } from '../common/backend-promise.service';

@Injectable()
export class UserPromiseService {

  constructor(
    private backend: BackendPromiseService,
    private logger: Logger) { }

  public getUsers(): Promise<User[]> {
    return this.backend.findAll(User).then(
      users => {
        this.logger.log(`Fetched ${users.length} users.`);
        return users;
      });
  }

  public getUser(id: string): Promise<User> {
    return this.backend.find(User, id);
  }

  public addUser(user: User): Promise<User> {
    return this.backend.add(User, user);
  }

  public editUser(user: User): Promise<User> {
    return this.backend.edit(User, user);
  }

  public deleteUser(userId: string): Promise<User> {
    return this.backend.delete(User, userId);
  }
}
