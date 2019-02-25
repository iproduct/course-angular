import { User } from './user.js';
import { RepositoryImpl } from './repository.js';

export class UserRepository extends RepositoryImpl<User> {
    findUserByEmail(email: string): User | undefined {
        return this.entities.find(e => e.email === email);
    }
}

