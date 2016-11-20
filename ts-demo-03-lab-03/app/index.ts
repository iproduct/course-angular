// import greeter from './greeter';
import { Repository, DemoUserRepository } from './user-repository';
import { DemoLoginController, LoginController } from './login-controller';
import { Customer, Admin, User } from './users';
import { LoginComponent } from './login-component';

const userRepo: Repository<User>  = new DemoUserRepository();
userRepo.addUser(new Customer('John', 'Smith', 'john@abv.bg', 'john'));
userRepo.addUser(new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.addUser(new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));

const loginController: LoginController = new DemoLoginController(userRepo);
// loginController.login('john@abv.bg', 'john');

// let user = 'TypeScript User';
// document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );

const loginComponent = new LoginComponent('#content', loginController);

// console.log(new PhysicalPerson('Ivan', 'Donchev', 'Petrov').salutation);

interface Repository<T> {
    findById: (id: number) => T;
    findAll(): Array<T>;
}

interface Idetifiable {
  id: number;
}
export class RepositoryImpl<T extends Idetifiable> implements Repository<T> {
    private data: T[] = [];
    public findById(id: number): T {
       let results =  this.data.filter(item => item.id === id);
       return results.length > 0 ? results[0] : undefined;
    }
    public findAll(): T[] {
        let results: T[] = [];
        this.data.forEach(item => results.push(item));
        return results;
    }
}