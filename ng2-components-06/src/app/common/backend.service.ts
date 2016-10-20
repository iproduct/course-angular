import { Injectable, Type } from '@angular/core';

import { Logger } from './logger.service';
import { Product } from '../products/product.model';
import { User, Customer, Admin, Operator } from '../users/user.model';
import { Gender } from './../users/user.model';

const PRODUCTS = [
  new Product('Logitech Mouse', 12.99, 'Super mouse'),
  new Product('Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun!')
];

const USERS = [
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

  public getAll(type: Type<any>): Promise<any> {
    if (type === Product) {
      // TODO get from the database
      return Promise.resolve(PRODUCTS);
    } else if (type === User) {
      // TODO get from the database
      return Promise.resolve(USERS);
    }
    let err = new Error(`Cannot get object of this type : ${type}`);
    return Promise.reject(err);
  }
}
