export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  contact?: Contact;
}

export interface Contact {
  city?: string;
  address?: string;
  phone?: string;
}

interface AddRoleMethodType {
    (role: Role): void;
}

export interface User extends Person {
  password: string;
  roles: Role[];
  readonly salutation: string;
  addRole: AddRoleMethodType;
}

export enum Role {
  ADMIN = 1,
  CUSTOMER
}

export class UserBase implements User {
  static nextId = 0;
  id: number = UserBase.nextId ++;
  get salutation() {
      return `${this.firstName} ${this.lastName} 
          in roles: ${this.roles.map(role => Role[role]).join(", ")}`;
  }
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public roles: Role[] = [],
    public contact?: Contact
  ) {}
    addRole(role: Role): void {
        this.roles.push(role);
    }
}

export class Customer extends UserBase {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public contact?: Contact
  ) {
    super(firstName, lastName, email, password, [Role.CUSTOMER], contact);
  }
}

export class Admin extends UserBase {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public contact?: Contact
  ) {
    super(firstName, lastName, email, password, [Role.ADMIN], contact);
  }
}
