import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, ResourceType } from '../shared/shared-types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export const BASE_API_URL = 'http://localhost:4200/api/';
export const COLLECTION_TO_URL_MAP = {
  'Product': 'products',
  'User': 'users'
};

export interface RestResponse<T extends Identifiable> {
  data: T[];
}

@Injectable()
export class BackendHttpService implements BackendService {
  constructor(private http: HttpClient) { }

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    const url = BASE_API_URL + this.getCollectionName(kind);
    return this.http.get<RestResponse<T>>(url).pipe(
      map(resp => resp.data),
      tap(entities => console.log(entities))
    );
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }
  add<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    throw new Error('Method not implemented.');
  }
  delete<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }

  protected getCollectionName<T extends Identifiable>(kind: ResourceType<T>): string {
    return COLLECTION_TO_URL_MAP[kind.typeId];
  }


}
