export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    readonly salutation: string;
    contact?: Contact;
}

export interface User extends Person {
    email: string;
    password: string;
    roles: Role[];
}

export interface Contact {
    city?: String;
    address?: String;
    phone?: String;
}

export enum Role {
    ADMIN = 2, CUSTOMER = 5
}

export class Customer implements User {
    public id: number; // set automatically by repository
    constructor(public firstName: string, public lastName: string, public email: string,
                public password: string, public contacts?: Contact,
                public roles: Array<Role> = [ Role.CUSTOMER ]) {
    }
    public get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}

export class Admin implements User {
    public id: number; // set automatically by repository
    constructor(public firstName: string, public lastName: string, public email: string,
                public password: string, public contacts?: Contact,
                public roles: Array<Role> = [ Role.ADMIN ]) {
    }
    public get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }

}

export class PhysicalPerson implements Person {
    id: number;
    public restNames: string[];

    constructor(public firstName: string, ...restNames: string[]) {
        this.restNames = restNames;
    }

    public get lastName() {
        return (this.restNames.length > 0) ? this.restNames[this.restNames.length - 1] : '';
    }

    public get salutation() {
        let salutation = this.firstName;
        for (let name of this.restNames) {
            salutation += ' ' + name;
        }
        return salutation;
    } 

}
