import { IdType, Identifiable } from '../shared/shared-types';

export class Product implements Identifiable {
  id: IdType;
  constructor(
    public name: string,
    public price: number,
    public description?: string
  ) {}
}
