import {Person, Contact} from './person.js';

export interface User extends Person {
    password: string;
    roles: Role[];
    readonly salutation: string;
}

export enum Role {
    CUSTOMER = 1, MANAGER, ADMIN
}

export class UserBase implements User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,   
        public roles: Role[],
        public contact?: Contact){}

        public get salutation() {
            return `${this.firstName} ${this.lastName} in role: 
            ${this.roles.map(role => Role[role]).join(", ")}`;
        }
}