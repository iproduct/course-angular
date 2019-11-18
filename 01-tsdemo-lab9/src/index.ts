import { greeter } from "./greeter.js";
import { UserImpl, Role, Customer, Admin } from './users.js';
import { UserRepository, LoginController, DemoLoginController } from "./controller.js";
import { LoginComponent } from "./login-component.js";

// const user = "Trayan";

// document.body.textContent = greeter(user);

const userRepo = new UserRepository();

const user1 = new UserImpl(1, 'Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', 
    [Role.MANAGER, Role.ADMIN]);


userRepo.create(user1);
userRepo.create(
    new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john123'));
userRepo.create(
    new Admin(1, 'Maria', 'Nikolova', 'mary@gmail.com', 'mary123'));

// const intemsStr = userRepo.findAll().map(user => user.salutation)
//     .reduce((acc, userStr) => acc += `<li>${userStr}</li>`, '');
    
// document.getElementById('content')!.innerHTML = `<ul>${intemsStr}</ul>`;

console.log(userRepo.findAll());

const loginController: LoginController = new DemoLoginController(userRepo);
const loginComponent = new LoginComponent('#content', loginController);
