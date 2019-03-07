import { Identifiable, IdType } from '../shared/shared-types';

export interface IUser extends Identifiable {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  gender: Gender;
  role: Role;
  avatarUrl?: string;
}

export enum Gender {
    FEMALE = 0, MALE = 1
}

export enum Role {
    CUSTOMER = 1, OPERATOR, ADMIN
}

export class User implements IUser {
  static typeId = 'User';
  public id: IdType;
  constructor(
        public username: string,
        public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public gender: Gender = Gender.FEMALE,
        public role: Role = Role.CUSTOMER,
        public avatarUrl?: string) {
    }

}
