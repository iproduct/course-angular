import { UserBase, Role } from './user.js';
import { RepositoryImpl } from './repository.js';
function greeter(person) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user1 = new UserBase(1, 'Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', [Role.MANAGER, Role.ADMIN]);
const userRepo = new RepositoryImpl();
userRepo.create(user1);
userRepo.create(new UserBase(1, 'John', 'Smith', 'john@gmail.com', 'john123', [Role.CUSTOMER]));
userRepo.create(new UserBase(1, 'Maria', 'Nikolova', 'mary@gmail.com', 'mary123', [Role.ADMIN]));
document.getElementById('content').innerHTML = '<ol>' +
    userRepo.findAll()
        .map(user => `<li>${user.salutation}</li>`)
        .join('\n')
    + '</ol>';
//# sourceMappingURL=index.js.map