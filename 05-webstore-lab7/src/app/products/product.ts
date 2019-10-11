import { Identifiable } from '../shared/common-types';

export class Product implements Identifiable {
  static typeId = 'Product';
  id: string;
  constructor(
    public name: string,
    public price: number,
    public description?: string,
    public imageUrl?: string,
    ) {}
}
