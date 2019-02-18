import { UserRepository, DemoUserRepository } from "./user-dao";
import { Customer, Admin, Person } from './users';
import { LoginController, LoginControllerImpl } from './login-controller';
import { LoginComponent } from './login-component';

function greeter(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName + ' from Typescript!';
}

const user1 = {
    firstName: 'John',
    lastName: 'Smith'
};

const userRepo: UserRepository = new DemoUserRepository();
userRepo.addUser(new Customer('John', 'Smith', 'john@abv.bg', 'john'));
userRepo.addUser(new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.addUser(new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));

userRepo.findAllUsers().forEach(
    user => console.log(user)
);

const controller: LoginController = new LoginControllerImpl(userRepo);

const loginComp = new LoginComponent("#content", controller);
