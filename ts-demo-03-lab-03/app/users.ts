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

export interface User extends Person {
  password: string;
  role: Role;
  readonly salutation: string;
}

export enum Role {
  CUSTOMER = 1, OPERATOR, ADMIN
}


abstract class UserImpl implements User {
  public id: number;
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: Role,
    public contact?: Contact
  ) {
    this.id = undefined;
  }
  public get salutation() {
    let roleStr = Role[this.role];
    return `${this.firstName} ${this.lastName} in role ${roleStr}`;
  }
}

export class Customer extends UserImpl {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contact?: Contact) {
    super(firstName, lastName, email, password, Role.CUSTOMER, contact);
  }
}

export class Operator extends UserImpl {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contact?: Contact) {
    super(firstName, lastName, email, password, Role.OPERATOR, contact);
  }
}

export class Admin extends UserImpl {
  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contact?: Contact) {
    super(firstName, lastName, email, password, Role.ADMIN, contact);
  }
}

