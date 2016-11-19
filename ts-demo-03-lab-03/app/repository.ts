import { User } from './users';

export interface Repository<T> {
  addUser: (entity: T) => T;
  findAll(): T[];
  // find(criteria: string | ((user: User) => boolean)): User[];
}

// interface UserMap {
//   [id: number]: User;
// }

export class UserRepositoryImpl implements Repository<User> {
  private static nextId: number = 0;
  private users = new Map<number, User>();
  public addUser(user: User) {
    user.id = ++UserRepositoryImpl.nextId;
    this.users.set(user.id, user);
    // this.users[user.id] = user;
    return user;
  }
  public findAll() {
    let result: User[] = [];
    this.users.forEach( user => result.push(user));
    // for (let userId in this.users) {
    //   if (this.users.hasOwnProperty(userId)) {
    //     result.push(this.users[userId]);
    //   }
    // }
    return result;
  }
}