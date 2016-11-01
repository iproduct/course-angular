import { Type } from '@angular/core';
import { Identifiable } from './common.interfaces';

export abstract class BackendService {

  public findAll: <T extends Identifiable>(type: Type<T>) => Promise<T[]>;

  public abstract find<T extends Identifiable>(type: Type<T>, id: number): Promise<T>;

  public abstract add<T extends Identifiable>(type: Type<T>, item: T): Promise<T>;

  public abstract edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T>;

  public abstract delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<void>;

}
