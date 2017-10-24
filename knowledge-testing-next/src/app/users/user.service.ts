import { Injectable } from '@angular/core';
import { LoggerService } from '../core/logger.service';
import { BackendPromiseService } from '../core/backend-promise.service';
import { User } from './user.model';
import { IdentityType } from '../shared/shared-types';

@Injectable()
export class UserService {

  constructor(private logger: LoggerService, private backend: BackendPromiseService) {
  }

  findAllUsers(): Promise<User[]> {
    return this.backend.findAll(User);
  }

  findUser(id: IdentityType): Promise<User> {
    return this.backend.find(User, id);
  }

  addUser(user: User) {
    return this.backend.add(User, user);
  }

  editUser(user: User) {
    return this.backend.edit(User, user);
  }

  deleteUser(userId: IdentityType) {
    return this.backend.delete(User, userId);
  }

}
