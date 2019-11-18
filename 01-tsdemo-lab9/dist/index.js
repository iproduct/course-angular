import { UserImpl, Role, Customer, Admin } from './users.js';
import { UserRepository, DemoLoginController } from "./controller.js";
import { LoginComponent } from "./login-component.js";
var userRepo = new UserRepository();
var user1 = new UserImpl(1, 'Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', [Role.MANAGER, Role.ADMIN]);
userRepo.create(user1);
userRepo.create(new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john123'));
userRepo.create(new Admin(1, 'Maria', 'Nikolova', 'mary@gmail.com', 'mary123'));
console.log(userRepo.findAll());
var loginController = new DemoLoginController(userRepo);
var loginComponent = new LoginComponent('#content', loginController);
//# sourceMappingURL=index.js.map