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

// console.log(new PhysicalPerson('Ivan', 'Donchev', 'Petrov').salutation);

// interface Repository<T> {
//     findById: (id: number) => T;
//     findAll(): Array<T>;
// }
// export class RepositoryImpl<T> implements Repository<T> {
//     private data = new Map<number, T>();
//     public findById(id: number): T {
//         return this.data.get(id);
//     }
//     public findAll(): T[] {
//         let results: T[] = [];
//         this.data.forEach(item => results.push(item));
//         return results;
//     }
// }