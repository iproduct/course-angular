export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    contact?: Contact;
    roles: Role[];
    getSalutation(): string;
}

export interface Contact {
    city?: String;
    address?: String;
    phone?: String;
}

export enum Role {
    ADMIN, CUSTOMER
}

export class Customer implements User {
    public id: number; // set automatically by repository
    constructor(public firstName: string, public lastName: string, public email: string,
                public password: string, public contacts?: Contact,
                public roles: Array<Role> = [ Role.CUSTOMER ]) {
    }
    public getSalutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}

export class Admin implements User {
    public id: number; // set automatically by repository
    constructor(public firstName: string, public lastName: string, public email: string,
                public password: string, public contacts?: Contact,
                public roles: Array<Role> = [ Role.ADMIN ]) {
    }
    public getSalutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }

}

