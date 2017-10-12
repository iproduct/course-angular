import { IdentityType } from '../shared/shared-types';

export class Person {
    public id: IdentityType;
    public firstName: string;
    public lastName: string;
    public gender: Gender;
    public email: string;
    public contact?: Contact;
}

export class User extends Person {
    public password: string;
    public role: Role;
    public readonly name: string;
    public readonly roleAsString: string;
    public readonly salutation: string;
}

export interface Contact {
    city?: String;
    address?: string;
    phone?: string;
}

export enum Gender {
    FEMALE = 0, MALE = 1
}

export enum Role {
    CUSTOMER = 2, OPERATOR= 4, ADMIN = 6
}

export class UserBase implements User {
    constructor(
        public id: IdentityType = undefined,
        public firstName: string = '', public lastName: string = '', public gender: Gender = Gender.FEMALE,
        public email: string = '', public password: string = '',
        public contact?: Contact,
        public role: Role = Role.CUSTOMER) {
    }

    public get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    public get roleAsString() {
        return Role[this.role];
    }

    // public get rolesAsString() {
    //     return this.roles.map(role => Role[role]).join(', ');
    // }

    public get salutation() {
        return `${this.name} in role: ${this.role}`;
    }
}

export class Customer extends UserBase {
    constructor(
        id: IdentityType,
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact) {
        super(id, firstName, lastName, gender, email, password, contact);
    }
}

export class Operator extends UserBase {
    constructor(
        id: IdentityType,
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact, role: Role = Role.OPERATOR) {
        super(id, firstName, lastName, gender, email, password, contact, role);
    }
}

export class Admin extends UserBase {
    constructor(
        id: IdentityType,
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact, role: Role = Role.ADMIN) {
        super(id, firstName, lastName, gender, email, password, contact, role);
    }
}
