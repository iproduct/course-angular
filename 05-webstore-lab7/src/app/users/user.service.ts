import { Injectable, Inject } from '@angular/core';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdType } from '../shared/common-types';
import { BACKEND_SERVICE } from '../core/backend.service';
import { BackendService } from '../core/backend.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject(BACKEND_SERVICE) private backend: BackendService) { }

  findAll(): Observable<User[]> {
    return this.backend.find(User);
  }

  findById(id: IdType): Observable<User | undefined> {
    return this.backend.findById(User, id);
  }

  findByEmail(email: string): Observable<User | undefined> {
    return this.backend.find(User).pipe(
      map( users => users.find(user => user.email === email) )
    );
  }

  create(entity: User): Observable<User | undefined> {
    return this.backend.add(User, entity);
  }

  update(entity: User): Observable<User | undefined> {
    return this.backend.update(User, entity);
  }

  delete(id: IdType): Observable<User | undefined> {
    return this.backend.delete(User, id);
  }

}
