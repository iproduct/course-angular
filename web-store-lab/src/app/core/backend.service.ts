import { Identifiable, IdType } from '../shared/shared-types';
import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export interface BackendService  {
  findAll<T extends Identifiable> (type: Type<T>): Observable<T[]> ;
  create<T extends Identifiable> (type: Type<T>, item: T): Observable<T>;
  update<T extends Identifiable> (type: Type<T>, item: T): Observable<T>;
  remove<T extends Identifiable> (type: Type<T>, id: IdType): Observable<T>;
  // refresh<T extends Identifiable> (type: Type<T>): Observable<T[]> ;
}
