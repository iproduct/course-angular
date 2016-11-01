import {Repository} from './user-repository';
import {User} from './user.model';
import {resolvePromiseAfterTimeout} from './utilities';

export interface LoginController {
    login(email: string, password: string): Promise<User>;
    logout(): Promise<User>;
    getCurrentUser(): User;
}

export class DemoLoginController implements LoginController {
    private loggedUser: User = undefined;

    constructor(private repository: Repository<User>) {}

    public login(email: string, password: string): Promise<User>;
    public login(user: User): Promise<User>;
    public login(principal: User | string, credentials?: string): Promise<User> {
        let email: string;
        let password: string;
        if (typeof principal === 'User') {
            email = principal.email;
            password = principal.password;
        } else {
            email = principal;
            password = credentials;
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

    public logout(): Promise<User> {
        this.loggedUser = undefined;
        return resolvePromiseAfterTimeout<User>(this.getCurrentUser(), 500);
    }

    public getCurrentUser() {
        return this.loggedUser;
    }
}
