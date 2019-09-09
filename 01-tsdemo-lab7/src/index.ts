import {User} from './person.js';

const user1 = new User(1, 'John', 'Smith', {country:'Bulgaria', city:'Sofia'});
console.log(user1);
(document.getElementById('content') as HTMLDivElement).innerHTML = user1.salutation;