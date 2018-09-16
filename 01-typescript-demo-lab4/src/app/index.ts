// import greeter from './greeter';
import { UserRepository, DemoUserRepository } from './repository';
import { DemoLoginController, LoginController } from './controller';
import { Customer, Admin, User, PhysicalPerson } from './users';
import { LoginComponent } from './login-component';
import './decorators02';

const userRepo: UserRepository = new DemoUserRepository();
userRepo.addUser(new Customer('John', 'Smith', 'john@abv.bg', 'john'));
userRepo.addUser(new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.addUser(new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));

for (let val of userRepo.findAllUsers()) {
  console.log(val);
}

const loginController: LoginController = new DemoLoginController(userRepo);
// loginController.login('john@abv.bg', 'john');

// let user = 'TypeScript User';
// document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );

const loginComponent = new LoginComponent('#content', loginController);

console.log(new PhysicalPerson('Ivan', 'Donchev', 'Petrov').salutation);

interface Identifiable {
  id: number;
} 

interface Repository<T extends Identifiable> {
  add(id: number, value: T): void;
  update(value: T): T;
  findById: (id: number) => T;
  findAll(): Array<T>;
}
export class RepositoryImpl<T extends Identifiable> implements Repository<T> {
  private data = new Map<number, T>();

  public add(id: number, value: T): void {
    this.data.set(id, value);
  }

  update(value: T): T {
    // const old = this.data.get(value.id);
    this.data.set(value.id, value);
    return value;
  }

  public findById(id: number): T {
    return this.data.get(id);
  }
  public findAll(): T[] {
    let results: T[] = [];
    this.data.forEach(item => results.push(item));
    return results;
  }
}

const userRepoGeneric: Repository<User> = new RepositoryImpl<User>();
const mockData: Array<[number, User]> = [
  [1, new Customer('John', 'Smith', 'john@abv.bg', 'john')],
  [2, new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara')]
];

mockData.forEach(entry => userRepoGeneric.add(entry[0], entry[1]));
console.log(userRepoGeneric.findAll().map(u => u.salutation));
