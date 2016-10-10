import {UserRepository} from './user-repository';
import {User} from './users';
import {resolvePromiseAfterTimeout} from './utilities';

export interface LoginController {
    login(email: string, password: string): Promise<User>;
    logout(): Promise<User>;
    getCurrentUser(): User;
}

export class DemoLoginController implements LoginController {
    private loggedUser: User = undefined;

    constructor(private repository: UserRepository) {}

    public login(email: string, password: string): Promise<User> {
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
