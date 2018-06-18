import { Injectable, Type, Inject } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Identifiable, CollectionResponse, KeyType } from '../shared/common-types';
import { COLLECTION_ENDOINTS } from './collection-types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService implements BackendService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  findAll<T extends Identifiable>(type: Type<T>): Observable<T[]> {
    const url = `${this.apiUrl}/${COLLECTION_ENDOINTS[type.name]}`;
    return this.http.get<CollectionResponse<T>>(url).pipe(
      map( response => response.data)
    );
  }

  find<T extends Identifiable>(type: Type<T>, id: KeyType): Observable<T> {
    throw new Error('Method not implemented');
  }
  create<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    throw new Error('Method not implemented');
  }
  update<T extends Identifiable>(type: Type<T>, item: T): Observable<T> {
    throw new Error('Method not implemented');
  }
  remove<T extends Identifiable>(type: Type<T>, id: KeyType): Observable<T> {
    throw new Error('Method not implemented');
  }
}
