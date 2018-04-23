import { Identifiable, IdType } from '../shared/shared-types';
import { Type } from '@angular/core';

export interface BackendPromiseService  {
  findAll<T extends Identifiable> (type: Type<T>): Promise<T[]> ;
  create<T extends Identifiable> (type: Type<T>, item: T): Promise<T>;
  update<T extends Identifiable> (type: Type<T>, item: T): Promise<T>;
  remove<T extends Identifiable> (type: Type<T>, id: IdType): Promise<T>;
}
