export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    contact?: Contact;
    readonly salutation: string;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export class User implements Person {
    constructor(public id: number,
        public firstName: string,
        public lastName: string,
        public contact?: Contact){}
    get salutation() {
        return `Hello, ${this.firstName} ${this.lastName}`;
    }
}

