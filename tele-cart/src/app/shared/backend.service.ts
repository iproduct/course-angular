import { Type } from '@angular/core';
import { Identifiable } from './common-interfaces';
export interface BackendService {
  findAll: <T extends Identifiable>(type: Type<T>) => Promise<T[]>;
}