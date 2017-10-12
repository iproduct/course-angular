import { Identifiable } from '../shared/shared-types';


export class Product implements Identifiable {
  constructor(
    public id: string | undefined,
    public name?: string,
    public price?: number,
    public description?: string) {}
}

