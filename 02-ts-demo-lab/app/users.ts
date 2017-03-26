export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact?: string;
}

export interface User extends Person {
  password: string;
  roles: Role[];
  readonly salutation: string;
}

export enum Role {
  CUSTOMER = 1, ADMIN
}

export class Customer implements User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roles: Array<Role> = [Role.CUSTOMER],
    public contact: string = '') { }

  public get salutation() {
    return `Hello ${this.firstName} ${this.lastName}, in roles: 
      ${this.roles.map(r => Role[r]).join(', ')}`;
  }

  toString() {
    return `${this.id} - ${this.firstName} ${this.lastName}, ${this.email}, ${this.contact}`;
  }
}