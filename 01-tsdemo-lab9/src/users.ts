export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    contact?: Contact;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export interface User extends Person{
    email: string;
    password: string;
    role: Role[];
    readonly salutation: string;
}

export enum Role {
    CUSTOMER = 1, MANAGER, ADMIN
}

export class UserImpl implements User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,    
        public password: string,
        public role: Role[],
        public contact?: Contact) {}
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName}, in roles: ${this.role}.`
    }
}

export class Customer extends UserImpl {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,    
        public password: string,
         public contact?: Contact,
        public roles = [Role.CUSTOMER]) {
            super(id, email, password, firstName, lastName, roles, contact);
        }
}

export class Manager extends UserImpl {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,    
        public password: string,
        public contact?: Contact) {
            super(id, email, password, firstName, lastName, [Role.MANAGER], contact);
        }
}

export class Admin extends UserImpl {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,    
        public password: string,
        public contact?: Contact) {
            super(id, email, password, firstName, lastName, [Role.ADMIN], contact);
        }
}