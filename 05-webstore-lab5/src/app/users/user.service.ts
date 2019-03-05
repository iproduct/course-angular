import { Injectable } from '@angular/core';
import { User } from './user.model';
import { IdType } from '../shared/shared-types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendService } from '../core/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private backend: BackendService) { }

  findAll(): Observable<User[]> {
    return this.backend.findAll(User);
  }

  findById(id: IdType): Observable<User | undefined> {
    return this.backend.findById(User, id);
  }

  findByEmail(email: string): Observable<User | undefined> {
    return this.backend.findAll(User).pipe(
      map( users => users.find(user => user.email === email) )
    );
  }

  create (entity: User): Observable<User | undefined> {
    return this.backend.add(User, entity);
  }

  update(entity: User): Observable<User | undefined> {
    return this.backend.update(User, entity);
  }

  delete(id: IdType): Observable<User | undefined> {
    return this.backend.delete(User, id);
  }

}
