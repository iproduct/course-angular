import { Identifiable, IdType } from '../shared/common-types';

export class Product implements Identifiable {
  static typeId = 'Product';
  id: IdType;
  constructor(public name: string, public price: number,
              public description?: string, public imageUrl?: string) {}
}

