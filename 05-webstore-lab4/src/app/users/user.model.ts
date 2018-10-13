/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for
 * non-commercial illustartive and evaluation purposes only.
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { IdType, Identifiable } from '../shared/shared-types';
export class Person implements Identifiable {
    public id: IdType;
    public firstName: string;
    public lastName: string;
    public gender: Gender;
    public email: string;
    public contact?: Contact;
}

export class User extends Person {
  password: string;
  role: Role;
  readonly name: string;
  readonly roleAsString: string;
  readonly salutation: string;
}

export interface Contact {
    city?: String;
    address?: string;
    phone?: string;
}

export enum Gender {
    FEMALE = 0, MALE = 1
}

export enum Role {
    CUSTOMER = 2, OPERATOR= 4, ADMIN = 6
}

export class UserImpl implements User {
  public id: IdType;
  constructor(
        public firstName: string = '', public lastName: string = '', public gender: Gender = Gender.FEMALE,
        public email: string = '', public password: string = '',
        public contact?: Contact,
        public role: Role = Role.CUSTOMER) {
    }

    public get name() {
        return `${this.firstName} ${this.lastName}`;
    }

    public get roleAsString() {
        return Role[this.role];
    }

    // public get rolesAsString() {
    //     return this.roles.map(role => Role[role]).join(', ');
    // }

    public get salutation() {
        return `${this.name} in role: ${this.role}`;
    }
}

export class Customer extends UserImpl {
    constructor(
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact) {
        super(firstName, lastName, gender, email, password, contact);
    }
}

export class Operator extends UserImpl {
    constructor(
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact, role: Role = Role.OPERATOR) {
        super(firstName, lastName, gender, email, password, contact, role);
    }
}

export class Admin extends UserImpl {
    constructor(
        firstName: string, lastName: string, gender: Gender,
        email: string, password: string,
        contact?: Contact, role: Role = Role.ADMIN) {
        super(firstName, lastName, gender, email, password, contact, role);
    }
}
