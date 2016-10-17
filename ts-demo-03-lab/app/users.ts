
export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
}

export interface User extends Person{
    password: string;
    roles: Array<Role>; // or Role[]
    readonly salutation: string;
}

// export interface User {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     contact?: Contact;
//     roles: Array<Role>; // or Role[]
//     readonly salutation: string;
// }

export interface Contact {
    city?: String;
    address?: string;
    phone?: string;
}

export enum Role {
    ADMIN = 1, CUSTOMER
}

abstract class UserImpl implements User, Person {
    public id: number;
    constructor( public firstName: string,  public lastName: string,
                 public email: string, public password: string,
                 public contact?: Contact,
                 public roles: Array<Role> = [Role.CUSTOMER]) {}
    public get salutation() {
        let roleStr = this.roles.map(role => Role[role]).join(', ');
        // for (let role of this.roles) {
        //     roleStr += Role[role] + ' ';
        // }
        return `${this.firstName} ${this.lastName} in roles: ${roleStr}`;
    }
}

export class Customer extends UserImpl {
    constructor(firstName: string,  lastName: string,
                email: string, password: string,
                contact?: Contact) {
        super(firstName, lastName, email, password, contact);
    }
    //  public customerMethod(): void { }
}

export class Admin extends UserImpl implements Customer  {
    constructor(firstName: string,  lastName: string,
                email: string, password: string,
                contact?: Contact, roles: Array<Role> = [Role.ADMIN]) {
        super(firstName, lastName, email, password, contact, roles);
    }
}
