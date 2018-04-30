import { Identifiable } from '../common/common.interfaces';

export class Product implements Identifiable {
  constructor(
    public id: string | undefined,
    public name?: string,
    public price?: number,
    public description?: string) {}
}

