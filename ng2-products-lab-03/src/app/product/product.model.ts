import { Identifiable } from '../shared/common.interfaces';

export class Product implements Identifiable {
  constructor(
    public id: number | undefined,
    public name?: string,
    public price?: number,
    public description?: string) {}
}

