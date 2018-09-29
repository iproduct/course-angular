import { Identifiable, IdType } from '../shared/shared-types';
let nextId = 1;
export class Product implements Identifiable {
  id: IdType;
  constructor(
    public name: string,
    public price: number,
    public description?: string
  ) {
    this.id = nextId++ + '';
  }
}
