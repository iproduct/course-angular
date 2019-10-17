import { Identifiable, ResourceType, IdType } from '../shared/shared-types';
import { Observable } from 'rxjs';

export interface BackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  delete<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
}
