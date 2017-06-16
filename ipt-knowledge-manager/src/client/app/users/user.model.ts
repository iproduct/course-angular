/*
 * Copyright (c) 2015-2017 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 *
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this project.
 *
 */

import { Identifiable, IdentityType } from '../shared/shared-types';
export enum Role {
  STUDENT = 1, INSTRUCTOR, ADMIN
}

export interface IUser extends Identifiable {
    readonly email: string,
    readonly fname: string,
    readonly lname: string,
    readonly password: string,
    readonly role: Role
}

export class User implements IUser {
  constructor (
    public readonly id: IdentityType = '',
    public readonly email: string = '',
    public readonly fname: string = '',
    public readonly lname: string = '',
    public readonly password: string = '',
    public readonly role: Role = Role.STUDENT) {}
}

export class Credentials {
  constructor(
    public readonly username: string,
    public readonly password: string) {}
}

