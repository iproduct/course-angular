import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Identifiable, ResourceType } from '../shared/common-types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const BASE_API_URL = 'http://localhost:4200/api';

export const ENTITY_TO_URL_MAP = {
  'Product': 'products',
  'User': 'users',
}

export interface DataResponse<T> {
  data: T
}

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService implements BackendService{

  constructor(private http: HttpClient) {}

  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]> {
    return this.http.get<DataResponse<T[]>>(`${BASE_API_URL}/${this.getUrl(kind)}`)
      .pipe(
        map(dataResp => dataResp.data)
      )
  }
  findById<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    throw new Error("Method not implemented.");
  }
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T> {
    throw new Error("Method not implemented.");
  }
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: string): Observable<T> {
    throw new Error("Method not implemented.");
  }

  protected getUrl<T extends Identifiable>(kind: ResourceType<T>): string {
    return ENTITY_TO_URL_MAP[kind.typeId];
  }

}
