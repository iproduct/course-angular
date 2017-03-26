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

class UserImpl {
  public roles: Array<Role>;
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public contact: string = '') { }

  public get salutation() {
    return `Hello ${this.firstName} ${this.lastName}, in roles: 
      ${this.roles.map(r => Role[r]).join(', ')}`;
  }

  toString() {
    return `${this.id} - ${this.firstName} ${this.lastName}, ${this.email}, ${this.contact}`;
  }
}

export class Customer extends UserImpl implements User {
  public roles: Array<Role> = [Role.CUSTOMER];
}

export class Admin extends UserImpl implements User {
  public roles: Array<Role> = [Role.ADMIN];
}