import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Product } from './product.model';
import { Customer, Admin, Operator } from '../users/user.model';
import { Gender } from './../users/user.model';
import { Identifiable } from './common.interfaces';

const PRODUCTS: Identifiable[] = [
  new Product(1, 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product(2, 'Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product(3, 'Whiteboard Marker', 0.32, 'Drawing is fun!')
];

const USERS: Identifiable[] = [
  new Customer(1, 'John', 'Smith', Gender.MALE, 'john@abv.bg', 'john'),
  new Customer(2, 'Sara', 'Smith', Gender.FEMALE, 'sara@abv.bg', 'sara'),
  new Operator(3, 'Veronica', 'Simpson', Gender.FEMALE, 'vera@yahoo.com', 'vera'),
  new Operator(4, 'Simon', 'Stars', Gender.MALE, 'simon@yahoo.com', 'simon'),
  new Admin(5, 'Brian', 'Harisson', Gender.MALE, 'brian@gmail.com', 'brian'),
  new Admin(6, 'Svetlana', 'Borisova', Gender.FEMALE, 'sveta@gmail.com', 'sveta')
];

export class InMemoryDataModel implements InMemoryDbService {
  public createDb() {
    return {
      products: PRODUCTS,
      users: USERS
    };
  }
}
