import { UserBase, Role } from './user.js';
function greeter(person) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = new UserBase(1, 'Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', [Role.CUSTOMER]);
document.getElementById('content').innerHTML = greeter(user.salutation);
//# sourceMappingURL=greeter.js.map