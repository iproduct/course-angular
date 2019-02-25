import { UserRepository} from './user-repository.js';
import { DemoLoginController, LoginController } from './controller.js';
import { Admin, Manager, Customer } from './user.js';
import { LoginComponent } from './login-component.js';

const userRepo: UserRepository = new UserRepository();
userRepo.create(new Customer(1,'john@abv.bg', 'john', 'John', 'Smith'));
userRepo.create(new Manager(2, 'sara@abv.bg', 'sara', 'Sara', 'Smith'));
userRepo.create(new Admin(3,'brian@gmail.com', 'brian', 'Brian', 'Harisson'));

for (let val of userRepo.findAll()) {
  console.log(val);
}

const loginController: LoginController = new DemoLoginController(userRepo);
// loginController.login('john@abv.bg', 'john');

// let user = 'TypeScript User';
// document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );

const loginComponent = new LoginComponent('#content', loginController);