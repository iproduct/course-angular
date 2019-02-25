import { UserRepository } from './user-repository.js';
import { DemoLoginController } from './controller.js';
import { Admin, Manager, Customer } from './user.js';
import { LoginComponent } from './login-component.js';
var userRepo = new UserRepository();
userRepo.create(new Customer(1, 'john@abv.bg', 'john', 'John', 'Smith'));
userRepo.create(new Manager(2, 'sara@abv.bg', 'sara', 'Sara', 'Smith'));
userRepo.create(new Admin(3, 'brian@gmail.com', 'brian', 'Brian', 'Harisson'));
for (var _i = 0, _a = userRepo.findAll(); _i < _a.length; _i++) {
    var val = _a[_i];
    console.log(val);
}
var loginController = new DemoLoginController(userRepo);
var loginComponent = new LoginComponent('#content', loginController);
//# sourceMappingURL=index.js.map