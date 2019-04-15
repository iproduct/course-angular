import { Identifiable, IdType } from '../shared/common-types';

export class Product implements Identifiable {
  id: IdType;
  constructor(public name: string, public price: number, public description?: string,
              public imageUrl?: string) {}
}

