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
    roles: Array<Role>; //Role[]
    readonly salutation: string;
}

export enum Role {
    ADMIN = 1, CUSTOMER
}

export class Customer implements User {
    static nextId = 0;
    id = Customer.nextId++;
    constructor(public firstName: string, public lastName: string, public email: string,
        public password: string, public contacts?: Contact, 
        public roles: Array<Role> = [Role.CUSTOMER] ) {}
    public get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}

export class Admin implements User {
    static nextId = 0;
    id = Customer.nextId++;
    constructor(public firstName: string, public lastName: string, public email: string,
        public password: string, public contacts?: Contact, 
        public roles: Array<Role> = [Role.ADMIN] ) {}
    public get salutation() {
        return `${this.firstName} ${this.lastName} in role ${Role[this.roles[0]]}`;
    }
}


export class PhysicalPerson implements Person {
    id: number;
    email: string;
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

