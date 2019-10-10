import { Identifiable, IdType, ResourceType } from '../shared/shared-types';

export class Product implements Identifiable {
  static typeId = 'Product';
  id: IdType;
  constructor(
    public name: string,
    public price: number,
    public description?: string,
    public imageUrl?: string,
  ) {}

}
