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
    roles: Role[];
    readonly salutation: string;
}

export enum Role {
    ADMIN = 1, CUSTOMER
}

export class Customer implements User {
    public id: number;
    constructor(public firstName: string, public lastName: string,
                public email: string, public password: string, public contacts?: Contact,
                public roles: Role[] = [ Role.CUSTOMER]) {}
    get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}

export class Admin implements User {
    public id: number;
    constructor(public firstName: string, public lastName: string,
                public email: string, public password: string, public contacts?: Contact,
                public roles: Role[] = [ Role.ADMIN]) {}
    get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}
