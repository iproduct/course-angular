import { IdentityType, Identifiable } from '../shared/shared-types';
import { Type } from '@angular/core';

export abstract class BackendPromiseService {
  abstract find: <T extends Identifiable> (type: Type<T>, id: IdentityType) => Promise<T>;
  abstract findAll <T extends Identifiable>(type: Type<T>): Promise<T[]>;
  abstract add <T extends Identifiable>(type: Type<T>, item: T): Promise<T>;
  abstract edit <T extends Identifiable>(type: Type<T>, item: T): Promise<T>;
  abstract delete <T extends Identifiable>(type: Type<T>, id: IdentityType): Promise<T>;
}
