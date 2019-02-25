import { Person, Contact } from './person';

export interface User extends Person {
    password: string;
    roles: Role[];
    readonly salutation: string;
}

export enum Role {
    CUSTOMER = 1, MANAGER, ADMIN
}

export class UserBase implements User{
    constructor(
        public id: number,
        public email: string,
        public password: string,    
        public firstName: string,
        public lastName: string,
        public roles: Role[],
        public contact?: Contact) {}

        public get salutation(): string {
            return `${this.firstName} ${this.lastName} in role: ${this.roles.map(role => Role[role]).join(', ')}`
        }
}

export class Customer extends UserBase implements User {
    constructor(
        public id: number,
        public email: string,
        public password: string,    
        public firstName: string,
        public lastName: string,
        public contact?: Contact) {
            super( id, email, password, firstName, lastName, [Role.CUSTOMER], contact);
        }
}

export class Manager extends UserBase implements User {
    constructor(
        public id: number,
        public email: string,
        public password: string,    
        public firstName: string,
        public lastName: string,
        public contact?: Contact) {
            super( id, email, password, firstName, lastName, [Role.MANAGER], contact);
        }
}

export class Admin extends UserBase implements User {
    constructor(
        public id: number,
        public email: string,
        public password: string,    
        public firstName: string,
        public lastName: string,
        public contact?: Contact) {
            super( id, email, password, firstName, lastName, [Role.ADMIN], contact);
        }
}
