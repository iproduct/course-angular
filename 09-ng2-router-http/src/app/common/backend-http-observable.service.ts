import { Injectable, Inject, Type } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Logger } from './logger.service';
import { Product } from '../products/product.model';
import { User } from '../users/user.model';
import { Identifiable } from './common.interfaces';
import { BackendObservableService } from './backend-observable.service';
import { API_BASE_URL } from './common.module';
import { Subject, BehaviorSubject, Observable } from 'rxjs/Rx';

export const DEFAULT_MIN_FRESH = 10000; // Minimal freshness of chached data acceptable in mills

class Operation<T> {
    constructor(public name: string, public item?: T, public collection?: T[]) { }
}

class CacheItem<T extends Identifiable> {
    public values: Observable<T[]>;
    constructor(public ops: Subject<Operation<T>>) {
        this.values = ops.scan((oldState: Array<T>, nextOp: Operation<T>, index: number) => {
            let itemIndex: number;
            switch (nextOp.name) {
                case 'replace':
                    return nextOp.collection;
                case 'add':
                    oldState.push(nextOp.item);
                    return oldState;
                case 'edit':
                    itemIndex = oldState.findIndex(item => item.id === nextOp.item.id);
                    if (itemIndex !== undefined) {
                        oldState[itemIndex] = nextOp.item; // edit existing item  or Object.assign(collection[i], item);
                    } else {
                        oldState.push(nextOp.item); // add new
                    }
                    return oldState;
                case 'delete':
                    return oldState.filter(item => item.id !== nextOp.item.id);

                default:
                    return oldState;
            }
        }, []);
    }
}

interface CacheData<T extends Identifiable> {
    [key: string]: CacheItem<T>;
}

class ObservableCache {
    public data: CacheData<any> = {};

    constructor(public minFreshTreshodld: number = DEFAULT_MIN_FRESH) { }

    public getCollection<T extends Identifiable>(type: Type<T>): CacheItem<T> {
        if (!this.data[type.name]) {
            this.data[type.name] = new CacheItem<T>(
                new BehaviorSubject<Operation<T>>(new Operation('replace', undefined, []))
            );
            this.data[type.name].values.subscribe(
                v => console.log(`Observable collection: ${v.length} ${type.name}s observed.`)
            );
        }
        return this.data[type.name] as CacheItem<T>;
    }

    public getOperationsSubject<T extends Identifiable>(type: Type<T>): Subject<Operation<T>> {
        return this.getCollection<T>(type).ops;
    }

    public getCollectionObservable<T extends Identifiable>(type: Type<T>): Observable<T[]> {
        return this.getCollection<T>(type).values;
    }

    public getIndividualObservable<T extends Identifiable>(type: Type<T>, id: number): Observable<T> {
        return this.getCollectionObservable<T>(type)
            .map((items: T[]) => items.find(item => item.id === id));
    }

    public nextCollectionData<T extends Identifiable>(type: Type<T>, data?: T[]): void {
        let operation = data ? new Operation('replace', undefined, data) : new Operation('identity');
        this.getOperationsSubject<T>(type).next(operation as Operation<T>);
    }

    public addCollectionItem<T extends Identifiable>(type: Type<T>, itemData: T): void {
        this.getOperationsSubject<T>(type).next(new Operation('add', itemData));
    }

    public editCollectionItem<T extends Identifiable>(type: Type<T>, itemData: T): void {
        this.getOperationsSubject<T>(type).next(new Operation('edit', itemData));
    }

    public deleteCollectionItem<T extends Identifiable>(type: Type<T>, itemId: number): void {
        this.getOperationsSubject<T>(type).next(new Operation('delete', { id: itemId } as T));
    }

    // public getLastFetched<T extends Identifiable>(type: Type<T>): number {
    //     return this.getCollection(type).lastFetched;
    // }

    // public isFresh<T extends Identifiable>(type: Type<T>): boolean {
    //     return Date.now() - this.getLastFetched(type) < this.minFreshTreshodld;
    // }

    // public isEmpty<T extends Identifiable>(type: Type<T>): Promise<boolean> {
    //     return this.getCollectionObservable(type).last().toPromise().then(items => items === []);
    // }

    // public invalidate(key: string): void {
    //     this.data[key].lastFetched = 0;
    // }

}

@Injectable()
export class BackendHttpObservableService implements BackendObservableService {
    private apiBaseUrl: string;
    private cache = new ObservableCache();
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor( @Inject('API_BASE_URL') apiBaseUrl: string, private http: Http, private logger: Logger) {
        this.apiBaseUrl = apiBaseUrl;
    }

    public getCollectionObservable<T extends Identifiable>(type: Type<T>, reloadCache?: boolean): Observable<T[]> {
        return this.cache.getCollectionObservable(type);
    }

    public getIndividualObservable<T extends Identifiable>(type: Type<T>, id: number): Observable<T> {
        return this.cache.getIndividualObservable(type, id);
    }

    public refreshCollection<T extends Identifiable>(type: Type<T>, force: boolean = false): Promise<void> {
        let collection: string;
        switch (type.name) {
            case Product.name:
                collection = 'products';
                break;
            case User.name:
                collection = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + collection;
        // if (this.cache.isFresh(type)) {
        //     this.logger.log(`Fetching ${collection} from cache .`);
        //     this.cache.nextCollectionData(type);
        //     return Promise.resolve();
        // } else {
        return this.http.get(apiUrl)
            .map(response => response.json().data || [] as T[])
            .catch(this.handleErrorObservable)
            .forEach(data => {
                this.logger.log(`Fetched ${data.length} ${collection}.`);
                this.cache.nextCollectionData(type, data);
            });

    }

    public addItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void> {
        let collection: string;
        switch (type.name) {
            case Product.name:
                collection = 'products';
                break;
            case User.name:
                collection = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + collection;
        return this.http.post(apiUrl, JSON.stringify(item), this.options)
            .map(res => res.json().data)
            .catch(this.handleErrorObservable)
            .forEach(itemData => {
                this.logger.log(`Created ${type.name}: ${JSON.stringify(itemData)}`);
                this.cache.addCollectionItem(type, itemData); // apply changes immediately
                this.refreshCollection(type); // schedule async collection refresh
            });
    }

    public editItem<T extends Identifiable>(type: Type<T>, item: T): Promise<void> {
        let resource: string;
        switch (type.name) {
            case Product.name:
                resource = 'products';
                break;
            case User.name:
                resource = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + resource + '/' + item.id;
        return this.http.put(apiUrl, JSON.stringify(item), this.options)
            .catch(this.handleErrorObservable)
            .forEach(() => {
                this.logger.log(`Edited ${type.name}: ${JSON.stringify(item)}`);
                this.cache.editCollectionItem(type, item); // apply changes immediately
                // this.refreshCollection(type); // schedule async collection refresh
            });
    }

    public deleteItem<T extends Identifiable>(type: Type<T>, itemId: number): Promise<void> {
        let resource: string;
        switch (type.name) {
            case Product.name:
                resource = 'products';
                break;
            case User.name:
                resource = 'users';
                break;
            default:
                let err = new Error(`Cannot recognize entity type: ${type.name}`);
                this.cache.getOperationsSubject(type).error(err);
        }
        // call the HTTP API and return the Promise
        let apiUrl = this.apiBaseUrl + '/' + resource + '/' + itemId;
        return this.http.delete(apiUrl, this.options)
            .catch(this.handleErrorObservable)
            .forEach(() => {
                this.logger.log(`Deleted ${type.name} with ID: ${itemId}`);
                this.cache.deleteCollectionItem(type, itemId); // apply changes immediately
                this.refreshCollection(type); // schedule async collection refresh
            });
    }


    private handleErrorObservable(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = (body && body.error) || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message || error.toString() || 'Server Error';
        }
        // in a real world app, we may send the error to some remote logging infrastructure
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
