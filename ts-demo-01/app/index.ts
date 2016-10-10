// import greeter from './greeter';
import { UserRepository, DemoUserRepository } from './user-repository';
import { DemoLoginController, LoginController } from './login-controller';
import { Customer, Admin } from './users';
import { LoginComponent } from './login-component';

const userRepo: UserRepository  = new DemoUserRepository();
userRepo.addUser(new Customer('John', 'Smith', 'john@abv.bg', 'john'));
userRepo.addUser(new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.addUser(new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));

const loginController: LoginController = new DemoLoginController(userRepo);
// loginController.login('john@abv.bg', 'john');

// let user = 'TypeScript User';
// document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );

const loginComponent = new LoginComponent('#content', loginController);
