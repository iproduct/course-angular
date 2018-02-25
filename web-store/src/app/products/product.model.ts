import { Identifiable, KeyType } from '../shared/common-types';

let nextId = 0;

export class Product implements Identifiable {
  id: KeyType;
  constructor(
    public name: string,
    public price: number,
    public description?: string
  ) {
    this.id = ++nextId;
  }
}
