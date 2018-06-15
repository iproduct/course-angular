export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
}

export interface  Contact  {
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
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
        public roles = [Role.CUSTOMER]
    ) {}

    public get salutation() {
        const roleStr = this.roles.reduce((acc, role, index) => 
            acc + (index > 0 ? ', ' : '') + Role[role], '');
        return `${this.firstName} ${this.lastName} in roles [${roleStr}]`;
    }
}

export class Admin implements User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
       public roles = [Role.ADMIN]
    ) {}

    public get salutation() {
        const roleStr = this.roles.reduce((acc, role, index) => 
            acc + (index > 0 ? ', ' : '') + Role[role], '');
        return `Hi, ${this.firstName} in roles [${roleStr}]`;
    }
}
