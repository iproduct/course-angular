import { Injectable } from '@angular/core';

import { User } from './user.model';
import { LoggerService } from '../core/logger.service';
import { BackendPromiseService } from '../core/backend-promise.service';
import { IdentityType } from '../shared/shared-types';


@Injectable()
export class UserService {

  constructor(
    private backend: BackendPromiseService,
    private logger: LoggerService) { }

  public getUsers() {
    return this.backend.findAll(User).then(
      users => {
        this.logger.log(`Fetched ${users.length} users.`);
        return users;
      });
  }

  public getUser(id: IdentityType): Promise<User> {
    return this.backend.find(User, id);
  }

  public addUser(product: User): Promise<User> {
    return this.backend.add(User, product);
  }

  public editUser(product: User): Promise<User> {
    return this.backend.edit(User, product);
  }

  public deleteUser(productId: IdentityType): Promise<User> {
    return this.backend.delete(User, productId);
  }
}
