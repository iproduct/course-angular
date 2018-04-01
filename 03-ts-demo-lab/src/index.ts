
import { UserRepository, KeyType } from './user-repository';
import { DemoLoginController, LoginController } from './login-controller';
import { Customer, Admin, User } from './users';
import { LoginComponent } from './login-component';

const john = new Customer('John', 'Smith', 'john@gmail.com', 'john');
const sara = new Admin('Sara', 'Smith', 'sara@gmail.com', 'sara');
console.log(john.salutation);
console.log(sara.salutation);


const userRepo: UserRepository = new UserRepository();
userRepo.add(new Customer('John', 'Smith', 'john@abv.bg', 'john'));
userRepo.add(new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
userRepo.add(new Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));

for (let val of userRepo.findAll()) {
  console.log(val);
}

const loginController: LoginController = new DemoLoginController(userRepo);
// loginController.login('john@abv.bg', 'john');

// let user = 'TypeScript User';
// document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );

const loginComponent = new LoginComponent('#content', loginController);

// console.log(new PhysicalPerson('Ivan', 'Donchev', 'Petrov').salutation);

interface Repository<T> {
  add(key: number, value: T): void;
  findById: (id: number) => T;
  findAll(): Array<T>;
}
export class RepositoryImpl<T> implements Repository<T> {
  private data = new Map<number, T>();

  public add(key: number, value: T): void {
    this.data.set(key, value);
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

// const userRepoGeneric: Repository<User> = new RepositoryImpl<User>();
// const mockData: Array<[number, User]> = [
//   [1, new Customer('John', 'Smith', 'john@abv.bg', 'john')],
//   [2, new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara')]
// ];

// mockData.forEach(entry => userRepoGeneric.add(entry[0], entry[1]));
// console.log(userRepoGeneric.findAll().map(u => u.salutation));