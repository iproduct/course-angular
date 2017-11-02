import { IdentityType, Identifiable } from '../shared/shared-types';
import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export abstract class BackendService {
  abstract find: <T extends Identifiable> (type: Type<T>, id: IdentityType) => Observable<T>;
  abstract findAll <T extends Identifiable>(type: Type<T>): Observable<T[]>;
  abstract findAllWithRefresh<T extends Identifiable>(type: Type<T>): Observable<T[]>;
  abstract refresh<T extends Identifiable>(type: Type<T>): void;
  abstract add <T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
  abstract edit <T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
  abstract delete <T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T>;
}
