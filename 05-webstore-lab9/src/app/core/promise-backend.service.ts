import { Identifiable, IdType, ResourceType } from '../shared/common-types';
import { InjectionToken } from '@angular/core';
import { PromiseBackendMockService } from './promise-backend-mock.service';

export const PROMISE_BACKEND = new InjectionToken<PromiseBackendService>('PromiseBackendService');

// export const PROMISE_BACKEND = new InjectionToken<PromiseBackendService>('PromiseBackendService',
// {providedIn: 'root', factory: () => new PromiseBackendMockService()});

export  interface PromiseBackendService {
  findAll<T extends Identifiable>(kind: ResourceType<T>): Promise<T[]>;
  findById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
  create<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  update<T extends Identifiable>(kind: ResourceType<T>, entity: T): Promise<T>;
  deleteById<T extends Identifiable>(kind: ResourceType<T>, id: IdType): Promise<T>;
}

