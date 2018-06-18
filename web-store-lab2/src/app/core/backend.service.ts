import { Identifiable, KeyType } from '../shared/common-types';
import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class BackendService {
    abstract findAll<T extends Identifiable>(type: Type<T>): Observable<T[]>;
    abstract find<T extends Identifiable>(type: Type<T>, id: KeyType): Observable<T>;
    abstract create<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
    abstract update<T extends Identifiable>(type: Type<T>, item: T): Observable<T>;
    abstract remove<T extends Identifiable>(type: Type<T>, id: KeyType): Observable<T>;
}
