import { Admin, Customer, Manager } from './users.js';
import { UserRepository, DemoLoginController } from './controller.js';
import { LoginComponent } from './login-component.js';
var userRepo = new UserRepository();
var user1 = new Admin(1, 'John', 'Smith', 'john@gmail.com', 'john1', { country: 'Bulgaria', city: 'Sofia' });
userRepo.create(user1);
userRepo.create(new Customer(2, 'Kiril', 'Petrov', 'kpetrov@abv.bg', 'kiril'));
userRepo.create(new Manager(3, 'Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.create(new Admin(4, 'Brian', 'Harisson', 'brian@gmail.com', 'brian'));
for (var _i = 0, _a = userRepo.findAll(); _i < _a.length; _i++) {
    var val = _a[_i];
    console.log(val);
}
var loginController = new DemoLoginController(userRepo);
var loginComponent = new LoginComponent('#content', loginController);
//# sourceMappingURL=index.js.map