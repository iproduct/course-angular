import { Injectable, Inject, Type } from '@angular/core';
import { API_BASE_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { BackendPromiseService } from './backend-promise.service';
import { Identifiable, IdentityType } from '../shared/shared-types';
// import 'rxjs/operator/map';
import 'rxjs/Rx';

@Injectable()
export class BackendPromiseHttpService implements BackendPromiseService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient,
    private logger: LoggerService
  ) { }

  find <T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    return this.http.get<T>(this.baseUrl + '/' + this.getCollectionName(type) + '/' + id)
      .toPromise();
  }

  findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    return this.http.get<{data: T[]}>(this.baseUrl + '/' + this.getCollectionName(type))
      .map( json => json.data)
      .toPromise();
  }

  add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    return this.http.post<T>(this.baseUrl + '/' + this.getCollectionName(type), item)
      .toPromise();
  }
  edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }
  delete<T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T> {
    throw new Error('Method not implemented.');
  }

  private getCollectionName<T>(type: Type<T>) {
    return type.name + 's';
  }

}
