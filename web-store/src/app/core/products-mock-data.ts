import { Product } from '../products/product.model';
import { Identifiable } from '../shared/common-types';

export const PRODUCTS: Identifiable[] =   [
  new Product('Logitech Mouse', 12.99, 'Super mouse'),
  new Product('Wireless Keyboard', 23.85, 'Type whereever you are!'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun.'),
  new Product('Lenovo laptop', 1280, 'Lenovo traveller'),
  new Product('LCD beemer', 980.50, 'BENQ beamer'),
];
