import { Person, Customer } from './users';

const person = new Customer(1, 'John', 'Smith', 'jsmith@gmail.com', 'john');
document.querySelector('#content').innerHTML = person.salutation;