import { IdType } from './shared';

export interface Person {
    id: IdType;
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

export interface User extends Person{
    password: string;
    roles: Array<Role>; //Role[];
    readonly salutation: string;
}

export enum Role {
    CUSTOMER = 1, MANAGER, ADMIN 
}

export class UserImpl implements User {
    id: string;
    constructor(
        public firstName: string, 
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[],
        public contact?: Contact,
    ) {}

    get salutation() {
        return `${this.id}: ${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    };
}

export class Customer extends UserImpl {
    constructor(
        firstName: string, 
        lastName: string,
        email: string,
        password: string,
        roles?: Role[],
        contact?: Contact
    ) {
        super(firstName, lastName, email, password,
            roles ? roles: [Role.CUSTOMER], contact);
    }
}

export class Admin extends UserImpl {
    constructor(
       firstName: string, 
       lastName: string,
        email: string,
        password: string,
        roles?: Role[],
        contact?: Contact
    ) {
        super(firstName, lastName, email, password,
            roles ? roles: [Role.ADMIN], contact);
    }
}

export class Manager extends UserImpl {
    constructor(
       firstName: string, 
       lastName: string,
        email: string,
        password: string,
        roles?: Role[],
        contact?: Contact
    ) {
        super(firstName, lastName, email, password,
            roles ? roles: [Role.MANAGER], contact);
    }
}