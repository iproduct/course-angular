let nextId = 1; // autoincrement ids

export class Product{
  public id: number;
  constructor(
    public name: string,
    public price: number,
    public description?: string
    ) {
      this.id = nextId++;
    }
}