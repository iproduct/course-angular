import { User } from './user.model';

interface ManageUser<T> {
    (user: T): void;
}

export interface Repository<T> {
    addUser: ManageUser<T>;
    deleteUserById: (id: number) => void;
    editUser: ManageUser<T>;
    findUserById(id: number): T;
    findUserByEmail(email: string): T;
    findAllUsers(): Array<T>;
}

export class DemoUserRepository implements Repository<User> {
    private users = new Map<number, User>();

    public addUser(user: User): void {
        if (this.findUserByEmail(user.email)) {
            throw `User with email ${user.email} already exists.`;
        }
        user.id = this.getNextId();
        this.users.set(user.id, user);
    }

    public editUser(user: User): void {
        let found = this.findUserByEmail(user.email);
        if (found && found.id !== user.id) {
            throw `Another user with email ${user.email} already exists.`;
        }
        this.users.set(user.id, user);
    }

    public deleteUserById(id: number): void {
        delete this.users.get(id);
    }

    public findUserById(id: number): User {
        return this.users.get(id);
    }

    public findUserByEmail(email: string): User {
        let result: User = undefined;
        this.users.forEach(user => {
            if (user.email === email) {
                result = user;
                return false;
            }
        });
        return result;
    }

    public findAllUsers(): User[] {
        let results: User[] = [];
        this.users.forEach(user => results.push(user));
        return results;
    }

    private getNextId(): number {
        let maxId = 0;
        this.users.forEach((user) => {
            if (user.id > maxId) maxId = user.id;
        });
        return maxId + 1;
    }

}
