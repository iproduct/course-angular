import { User } from './person.js';
var user1 = new User(1, 'John', 'Smith', { country: 'Bulgaria', city: 'Sofia' });
console.log(user1);
document.getElementById('content').innerHTML = user1.salutation;
//# sourceMappingURL=index.js.map