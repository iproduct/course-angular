let nextId = 1;

export class Product {
  public id: number;
  constructor(
    public name: string,
    public price: number,
    public description?: string) {
    this.id = nextId++;
  }
}

