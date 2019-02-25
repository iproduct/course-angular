import { User } from "./user";
import { UserRepository } from "./user-repository.js";
import { resolvePromiseAfterTimeout } from "./utilities.js";

export interface LoginController {
    login(user: User): Promise<User>;
    login(email: string, password: string): Promise<User>;
    logout(): Promise<User | undefined>;
    getCurrentUser(): User | undefined;
}

export class DemoLoginController implements LoginController {
    private loggedUser: User | undefined = undefined;

    constructor(private repository: UserRepository) {}

    public login(principal: User | string, credentials?: string): Promise<User> {
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
                    reject(`Invalid username or password`);
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