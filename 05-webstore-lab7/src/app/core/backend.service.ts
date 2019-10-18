import { Identifiable, ResourceType, IdType } from '../shared/common-types';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const BACKEND_SERVICE =
  new InjectionToken<BackendService>('backend.service');

export interface BackendService {
  find<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  delete<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
}
