import { Type } from '@angular/core';
import { Identifiable, IdentityType } from './common-types';
import { Observable } from 'rxjs/Observable';

export abstract class BackendService {

  public findAll: <T extends Identifiable>(type: Type<T>) => Observable<T[]>;

  public abstract find<T extends Identifiable>(type: Type<T>, id: IdentityType): Observable<T>;

  public abstract add<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract edit<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;

  public abstract delete<T extends Identifiable>(type: Type<T>, itemId: IdentityType): Observable<T>;

}
