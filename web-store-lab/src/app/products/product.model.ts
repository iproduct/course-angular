import { IdType, Identifiable } from '../shared/shared-types';

export class Product implements Identifiable {
  constructor(
    public id: IdType,
    public name: string,
    public price: number,
    public description?: string
  ) {}
}
