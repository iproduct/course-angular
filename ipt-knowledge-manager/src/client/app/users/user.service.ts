import { Injectable } from '@angular/core';

import { User } from './user.model';
import { BackendService } from '../core/backend.service';
import { Logger } from '../core/logger.service';
// import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IdentityType } from '../shared/shared-types';

@Injectable()
export class UserService {

  constructor(
    private backend: BackendService,
    private logger: Logger) { }

  public findAllUsers(): Observable<User[]> {
    return this.backend.findAll(User);
  }

  public findUser(id: IdentityType): Observable<User> {
    return this.backend.find(User, id);
  }

 public addUser(user: User): Observable<User> {
    return this.backend.add(User, user);
  }

  public editUser(user: User): Observable<User> {
    return this.backend.edit(User, user);
  }

  public deleteUser(userId: string): Observable<User> {
    return this.backend.delete(User, userId);
  }

  // public getUsers(): Promise<User[]> {
  //   return this.backend.findAll(User).then(
  //     users => {
  //       this.logger.log(`Fetched ${users.length} users.`);
  //       return users;
  //     });
  // }

  // public getUser(id: number): Promise<User> {
  //   return this.backend.find(User, id);
  // }

  // public addUser(user: User): Promise<User> {
  //   return this.backend.add(User, user);
  // }

  // public editUser(user: User): Promise<User> {
  //   return this.backend.edit(User, user);
  // }

  // public deleteUser(userId: number): Promise<User> {
  //   return this.backend.delete(User, userId);
  // }
}
