import { Injectable, Type } from '@angular/core';

import { Logger } from './logger.service';
import { User, Role } from '../users/user.model';
import { Identifiable } from './common-types';
import { BackendService } from './backend.service';
import { BackendPromiseService } from './backend-promise.service';

const USERS: Identifiable[] = [
  new User('123456789abcdef012345678', 'john@abv.bg', 'John', 'Smith', 'john', Role.ADMIN),
  new User('123456789abcdef012345679', 'sara@abv.bg', 'Sara', 'Smith', 'sara', Role.INSTRUCTOR),
  new User('123456789abcdef012345680', 'vera@yahoo.com', 'Veronica', 'Simpson', 'vera', Role.STUDENT),
  new User('123456789abcdef012345681', 'brian@gmail.com', 'Brian', 'Harisson', 'brian', Role.STUDENT),
];

@Injectable()
export class BackendMockService implements BackendPromiseService {
  constructor(private logger: Logger) { }

  public findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      // case Product.name:
      //   return Promise.resolve(PRODUCTS);
      case User.name:
        return Promise.resolve(USERS);
      default:
       const err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T[]>(err);
    }
  }

  public find<T extends Identifiable>(type: Type<T>, id: string): Promise<T> {
    return this.findAll<T>(type).then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find object of type: ${type.name} with id: ${id}`);
    });
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    switch (type.name) {
      // case Product.name:
      //   item.id = this.getNextId(PRODUCTS);
      //   PRODUCTS.push(item);
      //   return Promise.resolve(item);
      case User.name:
        item.id = this.getNextId(USERS);
        USERS.push(item);
        return Promise.resolve(item);
      default:
        const err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T>(err);
    }
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let isSuccessful = false;
    let err = new Error(`${type.name} with ID:${item.id} does not exist: ${JSON.stringify(item)}.`);
    switch (type.name) {
      // case Product.name:
      //   isSuccessful = this.mergeItem(PRODUCTS, item);
      //   break;
      case User.name:
        isSuccessful = this.mergeItem(USERS, item);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return isSuccessful ? Promise.resolve(item) : Promise.reject<T>(err);
  }

 public delete<T extends Identifiable>(type: Type<T>, itemId: string): Promise<T> {
    let deleted: T | undefined;
    let err = new Error(`${type.name} with ID:${itemId} does not exist.`);
    switch (type.name) {
      // case Product.name:
      //   deleted = this.deleteItem(<T[]> PRODUCTS, itemId);
      //   break;
      case User.name:
        deleted = this.deleteItem(<T[]> USERS, itemId);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return deleted ? Promise.resolve(deleted) : Promise.reject<T>(err);
  }

  private getNextId(collection: Identifiable[]): string {
    return '' + collection.reduce((prevMaxId, next) =>
      +next.id > prevMaxId ? +next.id : prevMaxId, 0) + 1;
  }

  private mergeItem(collection: Identifiable[], item: Identifiable): boolean {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === item.id) {
        Object.assign(collection[i], item);
        return true;
      }
    }
    return false;
  }

  private deleteItem <T extends Identifiable> (collection: T[], id: string): T | undefined {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection.splice(i, 1)[0]; // delete the current element and return deleted
      }
    }
    return undefined;
  }

}
