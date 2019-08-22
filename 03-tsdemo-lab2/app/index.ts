import { Customer, Admin, User } from './users';
import { DemoUserRepository, UserRepository } from './user-repository';
import { LoginComponent } from './login-component';
import { DemoLoginController, LoginController } from './login-controller';

const users: User[] = [
    new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john'),
    new Admin(2, 'Brian', 'Harisson', 'brian@gmail.com', 'brian'),
    new Customer(3, 'Sia', 'Ivanova', 'sia@gmail.com', 'sia'),
    new Admin(4, 'Petar', 'Ivanov', 'petar@gmail.com', 'petar'),
    new Customer(5, 'Kolyo', 'Ivanov', 'kolyo@gmail.com', 'kolyo'),
];

users.map(user => user.salutation).forEach(salutation => console.log(salutation));

const userRepo: UserRepository = new DemoUserRepository();

users.forEach( user => userRepo.addUser(user) );

const loginController: LoginController = new DemoLoginController(userRepo);

const loginComponent = new LoginComponent("#content", loginController);

function f() {
    console.log("f(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}

const c = new C();
c.method();
