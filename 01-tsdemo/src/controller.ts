import { User } from "./users.js";
import { Repository, RepositoryImpl } from "./repository.js";
import { resolvePromiseAfterTimeout } from "./utilities.js";
import { validate, required, minLength } from './decorators.js';

export interface LoginController {
    login(user: User): Promise<User>;
    login(email: string, password: string): Promise<User>;
    logout(): Promise<User | undefined>;
    getCurrentUser(): User | undefined;
}

export class UserRepository extends RepositoryImpl<User> {
    findUserByEmail(email: string): User | undefined {
        return this.findAll().find( u => u.email === email);
    }
}

export class DemoLoginController implements LoginController {
    private loggedUser: User | undefined = undefined;

    constructor(private repository: UserRepository) {}

    
    public login(principal: User | string, credentials?: string): Promise<User> {
        try {
            return this.loginImpl(principal, credentials);
        } catch(e) {
            return Promise.reject(e);
        }
    }


    @validate
    private loginImpl(@required @minLength(2) principal: User | string, credentials?: string): Promise<User> {
        let email: string;
        let password: string | undefined;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials;
        } else {
            email = principal.email;
            password = principal.password;
        }
        let promise = new Promise<User>( (resolve, reject) => {
            setTimeout( () => {
                let user = this.repository.findUserByEmail(email);
                if (!user || user.password !== password) {
                    reject(new Error(`Invalid username or password`));
                }
                this.loggedUser = user;
                resolve(user);
            }, 1000);
        });
        return promise;
    }

    public logout(): Promise<User | undefined> {
        const user = this.getCurrentUser();
        this.loggedUser = undefined;
        return resolvePromiseAfterTimeout<User | undefined>(user, 500);
    }

    public getCurrentUser() {
        return this.loggedUser;
    }
}