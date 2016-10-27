import { Injectable, Type } from '@angular/core';

import { Logger } from './logger.service';
import { Product } from '../products/product.model';
import { User, Customer, Admin, Operator } from '../users/user.model';
import { Gender } from './../users/user.model';
import { Identifiable } from './common.interfaces';

const PRODUCTS: Identifiable[] = [
  new Product(1, 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product(2, 'Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product(3, 'Whiteboard Marker', 0.32, 'Drawing is fun!')
];

const USERS: Identifiable[] = [
  new Customer('John', 'Smith', Gender.MALE, 'john@abv.bg', 'john'),
  new Customer('Sara', 'Smith', Gender.FEMALE, 'sara@abv.bg', 'sara'),
  new Operator('Veronica', 'Simpson', Gender.FEMALE, 'vera@yahoo.com', 'vera'),
  new Operator('Simon', 'Stars', Gender.MALE, 'simon@yahoo.com', 'simon'),
  new Admin('Brian', 'Harisson', Gender.MALE, 'brian@gmail.com', 'brian'),
  new Admin('Svetlana', 'Borisova', Gender.FEMALE, 'sveta@gmail.com', 'sveta')
];

@Injectable()
export class BackendService {
  constructor(private logger: Logger) { }

  public findAll<T extends Identifiable>(type: Type<T>): Promise<T[]> {
    switch (type.name) {
      case Product.name:
        return Promise.resolve(PRODUCTS);
      case User.name:
        return Promise.resolve(USERS);
      default:
        let err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T[]>(err);
    }
  }

  public find<T extends Identifiable>(type: Type<T>, id: number): Promise<T> {
    return this.findAll<T>(type).then(
      items => items.filter(item => item.id === id)[0]
    ).catch(err => {
      throw new Error(`Cannot find object of type: ${type.name} with id: ${id}`);
    });
  }

  public add<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    switch (type.name) {
      case Product.name:
        item.id = this.getNextId(PRODUCTS);
        PRODUCTS.push(item);
        return Promise.resolve(item);
      case User.name:
        item.id = this.getNextId(PRODUCTS);
        PRODUCTS.push(item);
        return Promise.resolve(item);
      default:
        let err = new Error(`Cannot recognize entity type: ${type.name}`);
        return Promise.reject<T>(err);
    }
  }

  public edit<T extends Identifiable>(type: Type<T>, item: T): Promise<T> {
    let isSuccessful = false;
    let err = new Error(`${type.name} with ID:${item.id} does not exist: ${JSON.stringify(item)}.`);
    switch (type.name) {
      case Product.name:
        isSuccessful = this.mergeItem(PRODUCTS, item);
        break;
      case User.name:
        isSuccessful = this.mergeItem(USERS, item);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return isSuccessful ? Promise.resolve(item) : Promise.reject<T>(err);
  }

 public delete<T extends Identifiable>(type: Type<T>, itemId: number): Promise<T> {
    let deleted: T | undefined = undefined;
    let err = new Error(`${type.name} with ID:${itemId} does not exist.`);
    switch (type.name) {
      case Product.name:
        deleted = this.deleteItem(<T[]> PRODUCTS, itemId);
        break;
      case User.name:
        deleted = this.deleteItem(<T[]> USERS, itemId);
        break;
      default:
        err = new Error(`Cannot recognize entity type: ${type.name}`);
    }
    return deleted ? Promise.resolve(deleted) : Promise.reject<T>(err);
  }

  private getNextId(collection: Identifiable[]): number {
    return collection.reduce((prevMaxId, next) =>
      next.id > prevMaxId ? next.id : prevMaxId, 0) + 1;
  }

  private mergeItem(collection: Identifiable[], item: Identifiable): boolean {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === item.id) {
        collection[i] = item;
        return true;
      }
    }
    return false;
  }

  private deleteItem <T extends Identifiable> (collection: T[], id: number): T | undefined {
    for (let i = 0; i < collection.length; i++) {
      if (collection[i].id === id) {
        return collection.splice(i, 1)[0]; // delete the current element and return deleted
      }
    }
    return undefined;
  }

}
