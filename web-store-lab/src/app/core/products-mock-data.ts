import { Identifiable } from '../shared/shared-types';
import { Product } from '../products/product.model';

export const PRODUCTS: Identifiable[] = [
  new Product(1, 'Logitech Mouse', 12.99, 'Super mouse'),
  new Product(2, 'Wireless Keyboard', 23.85, 'Type whereever you are'),
  new Product(3, 'Whiteboard Marker', 0.32, 'Drawing is fun'),
  new Product(4, 'Lenovo Laptop', 1280, 'Lenovo traveller'),
  new Product(5, 'LCD Beemer', 980.50, 'BENQ beemer')
];
