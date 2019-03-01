import { Injectable, Inject, forwardRef } from '@angular/core';
import { Identifiable, ResourseType, IdType } from '../shared/shared-types';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface CollectionResponse<T> {
  data: T[];
}

export interface IndividualResponse<T> {
  data: T;
}

@Injectable()
export class BackendHtpPromiseService {
  private static nextId = 1;
  protected apiBaseUrl = `${environment.scheme}://${environment.domain}:${environment.port}/api`;

  constructor(private http: HttpClient) {}

  find<T extends Identifiable> (kind: ResourseType<T>): Promise<T[]> {
    const collectionPath = this.getCollectionPath(kind.typeId);
    return this.http.get<CollectionResponse<T>>(`${this.apiBaseUrl}/${collectionPath}`)
      .pipe(
        map(resp => resp.data),
        tap(data => console.log(data))
      ).toPromise();
  }

  // add<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
  //   entity.id = BackendHtpPromiseService.nextId++ + '';
  //   const collection = this.getCollection(kind.typeId);
  //   collection.push(entity);
  //   return Promise.resolve(entity as T);
  // }

  // update<T extends Identifiable> (kind: ResourseType<T>, entity: T): Promise<T> {
  //   const collection = this.getCollection(kind.typeId);
  //   const index = collection.findIndex(e => e.id === entity.id);
  //   collection[index] = entity;
  //   return Promise.resolve(entity as T);
  // }

  // delete<T extends Identifiable> (kind: ResourseType<T>, id: IdType): Promise<T> {
  //   const collection = this.getCollection(kind.typeId);
  //   const index = collection.findIndex(e => e.id === id);
  //   const entity = collection.splice(index, 1)[0];
  //   return Promise.resolve(entity as T);
  // }

  getCollectionPath(collectionName): string {
    switch (collectionName) {
      case 'Product': return 'products';
      case 'User': return 'users';
    }
  }

}
