import {User, Admin, Customer, Manager} from './users.js';
import { UserRepository, LoginController, DemoLoginController } from './controller.js';
import { LoginComponent } from './login-component.js';

const userRepo: UserRepository = new UserRepository();

const user1 = new Admin(1, 'John', 'Smith', 'john@gmail.com', 'john1', 
    {country:'Bulgaria', city:'Sofia'});
userRepo.create(user1);
userRepo.create(new Customer(2, 'Kiril', 'Petrov', 'kpetrov@abv.bg', 'kiril'));
userRepo.create(new Manager(3, 'Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.create(new Admin(4, 'Brian', 'Harisson', 'brian@gmail.com', 'brian'));
    
for (let val of userRepo.findAll()) {
    console.log(val);
}

const loginController: LoginController = new DemoLoginController(userRepo);
const loginComponent = new LoginComponent('#content', loginController);