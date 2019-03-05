import { Type } from '@angular/core';
import { Observable } from 'rxjs';
import { Identifiable, IdType, ResourceType } from '../shared/shared-types';

export abstract class BackendService {
    abstract findAll<T extends Identifiable>(type: ResourceType<T>): Observable<T[]>;
    abstract findById<T extends Identifiable>(type: ResourceType<T>, id: IdType): Observable<T | undefined>;
    abstract create<T extends Identifiable>(type: ResourceType<T>, item: T): Observable<T | undefined>;
    abstract update<T extends Identifiable>(type: ResourceType<T>, item: T): Observable<T | undefined>;
    abstract delete<T extends Identifiable>(type: ResourceType<T>, id: IdType): Observable<T | undefined>;
}
