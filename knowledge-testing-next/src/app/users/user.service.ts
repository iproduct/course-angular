import { Injectable } from '@angular/core';
import { LoggerService } from '../core/logger.service';
import { User } from './user.model';
import { IdentityType } from '../shared/shared-types';
import { BackendService } from '../core/backend.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private logger: LoggerService, private backend: BackendService) {
  }

  findAllUsers(): Observable<User[]> {
    return this.backend.findAllWithRefresh(User);
  }

  refreshUsers() {
    this.backend.refresh(User);
  }

  findUser(id: IdentityType): Observable<User> {
    return this.backend.find(User, id);
  }

  findUserByEmail(email: string): Observable<User> {
    return this.findAllUsers().switchMap(users => Observable.from<User>(users).first(user => user.email === email));
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
