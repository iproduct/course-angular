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

abstract class UserImpl implements User {
  static count: number = 0;
  public id: number;
  public roles: Array<Role>;
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public contact: string = '') {
      this.id = ++ UserImpl.count;
  }

  public get salutation() {
    return `${this.getPrefix()} [${this.id}]: Hello ${this.firstName} ${this.lastName}, in roles: 
      ${this.roles.map(r => Role[r]).join(', ')}`;
  }

  abstract getPrefix(): string;

  toString() {
    return `${this.id} - ${this.firstName} ${this.lastName}, ${this.email}, ${this.contact}`;
  }
}

export class Customer extends UserImpl {
  public roles: Array<Role> = [Role.CUSTOMER];
  getPrefix(): string {
    return 'Customer';
  }
}

export class Admin extends UserImpl implements User {
  public roles: Array<Role> = [Role.ADMIN];
  getPrefix(): string {
    return 'Admin';
  }

}
