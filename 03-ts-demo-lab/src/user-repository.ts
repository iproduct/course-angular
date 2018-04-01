import { User } from './users';

export type KeyType = number;

export interface Identifiable<K> {
  id: K;
}

export interface Repository<T extends Identifiable<K>, K> {
  add(user: T): T;
  update(user: T): T;
  delete(id: K): T;
  findById(id: K): T;
  findAll(): T[];
}

export class UserRepository implements Repository<User, KeyType> {
  private users = new Map<KeyType, User>();
  add(user: User): User {
    if (this.findUserByEmail(user.email)) {
      throw `User with email ${user.email} already exists.`;
    }
    const nextId = this.getNextId();
    user.id = nextId;
    this.users.set(nextId, user);
    return user;
  }
  update(user: User): User {
    let found = this.findUserByEmail(user.email);
    if (found && found.id !== user.id) {
      throw `Another user with email ${user.email} already exists.`;
    }
    this.users.set(user.id, user);
    return user;
  }
  delete(id: KeyType): User {
    const found = this.findById(id);
    if (this.users.delete(id)) return found;
    else return null;
  }
  findById(id: KeyType): User {
    return this.users.get(id);
  }
  findAll(): User[] {
    return Array.from(this.users.values());
  }
  findUserByEmail(email: string): User {
    let result: User = undefined;
    this.users.forEach(user => {
      if (user.email === email) {
        result = user;
        return false;
      }
    });
    return result;
  }

  private getNextId(): number {
    let maxId = 0;
    this.users.forEach(user => {
      if (user.id > maxId) maxId = user.id;
    });
    return maxId + 1;
  }
}
