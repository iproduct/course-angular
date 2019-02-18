import { User } from "./users";

export interface LoginController {
    login(user: User): Promise<User>;
    login(email: string, password: string): Promise<User>;
    logout(): Promise<User>;
    getCurrentUser(): User | undefined;
}

export class LoginControllerImpl implements LoginController {
    private loggedUser: User = undefined;


    login(principal: User | string, credentials? : string): Promise<User>{
        let email: string;
        let password: string;
        if(typeof principal === 'string') {
            email = principal;
            password = credentials;
        } else {
            email = principal.email;
            password = principal.password;
        }

        let promise = new Promise<User>((resolve, reject) => {
            setTimeout(() => {
                let user = this.repository.findUserByEmail(email);
                if(!user || password !== user.password) {
                    reject('Invalid username or password');
                } else {
                    this.loggedUser = user;
                    resolve(user);
                }
            }, 1000);
        });
            
        return promise;
    }
    
    logout(): Promise<User> {
        throw new Error("Method not implemented.");
    }
    getCurrentUser(): User {
        throw new Error("Method not implemented.");
    }
    
}