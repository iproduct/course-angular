import { Product } from '../products/product.model';
import { Identifiable } from '../shared/shared-types';

export const PRODUCTS: Identifiable[] = [
  new Product('Logitech Mouse', 12.99, 'Super mouse', 'https://assets.logitech.com/assets/64683/performance-mouse-mx.png'),
  new Product('Wireless Keyboard', 23.85, 'Type whereever you are',
    'https://images-na.ssl-images-amazon.com/images/G/01/aplus/detail-page/B005DKZTMG_K400_FOB_US_lg.jpg'),
  new Product('Whiteboard Marker', 0.32, 'Drawing is fun', 'https://www.esquoia.com/wp-content/uploads/2016/09/whiteboard-markers.jpg'),
  new Product('Lenovo Laptop', 1280, 'Lenovo traveller',
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Lenovo_ThinkPad_X1_Ultrabook.jpg'),
  new Product('LCD Beemer', 980.50, 'BENQ beemer',
    'https://www.varle.lt/static/uploads/products/292/ben/benq-w1700-desktop-projector-2200ansi-lumens_Lh17HoZ.jpeg')
];
