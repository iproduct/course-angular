import { Identifiable, IdType, ResourceType } from '../shared/common-types';

export class Product implements Identifiable {
  static typeId = 'Product';
  constructor(public id: IdType, public name: string, public price: number,
              public description?: string, public imageUrl?: string) {}
}

