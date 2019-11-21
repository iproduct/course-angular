import {S} from '@angular/cdk/keycodes/typings';
import { Identifiable, IdType, ResourceType } from '../shared/common-types';
import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendHttpService } from './backend-http.service';

export const BACKEND = new InjectionToken<BackendService>('BackendService');

export  interface BackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Observable<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Observable<T>;
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Observable<T>;
}

