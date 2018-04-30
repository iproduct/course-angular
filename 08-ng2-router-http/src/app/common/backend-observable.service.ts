import { Type } from '@angular/core';
import { Identifiable } from './common.interfaces';
import { Observable } from 'rxjs/Observable';

export abstract class BackendObservableService {

  public abstract getCollectionObservable<T extends Identifiable>(type: Type<T>): Observable<T[]>;

  public abstract getIndividualObservable<T extends Identifiable>(type: Type<T>, id: string): Observable<T>;

  public abstract refreshCollection<T extends Identifiable>(type: Type<T>): Promise<void>;

  public abstract addItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void>;

  public abstract editItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void>;

  public abstract deleteItem<T extends Identifiable>(type: Type<T>, itemId: string): Promise<void>;

}
