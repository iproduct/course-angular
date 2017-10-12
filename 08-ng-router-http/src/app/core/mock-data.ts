import { Identifiable } from '../shared/shared-types';
import { Product } from '../products/product.model';
import { Customer, Operator, Admin, Gender } from '../users/user.model';

export const PRODUCTS: Product[] = [
  new Product('123456789abcdef012345671', 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product('123456789abcdef012345672', 'Wirelesss Keyboard', 23.85, 'Type wherever you are!'),
  new Product('123456789abcdef012345683', 'Whiteboard Marker', 0.32, 'Drawing is fun!')
];

export const USERS: Identifiable[] = [
  new Customer('123456789abcdef012345651', 'John', 'Smith', Gender.MALE, 'john@abv.bg', 'john'),
  new Customer('123456789abcdef012345652', 'Sara', 'Smith', Gender.FEMALE, 'sara@abv.bg', 'sara'),
  new Operator('123456789abcdef012345653', 'Veronica', 'Simpson', Gender.FEMALE, 'vera@yahoo.com', 'vera'),
  new Operator('123456789abcdef012345654', 'Simon', 'Stars', Gender.MALE, 'simon@yahoo.com', 'simon'),
  new Admin('123456789abcdef012345655', 'Brian', 'Harisson', Gender.MALE, 'brian@gmail.com', 'brian'),
  new Admin('123456789abcdef012345656', 'Svetlana', 'Borisova', Gender.FEMALE, 'sveta@gmail.com', 'sveta')
];

