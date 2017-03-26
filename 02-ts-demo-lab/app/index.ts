import { Person, Customer, Admin } from './users';

const persons = [
    new Customer(1, 'John', 'Smith', 'jsmith@gmail.com', 'john'),
    new Admin(1, 'Brian', 'Winston', 'brian@gmail.com', 'brian')];
document.querySelector('#content').innerHTML = 
    persons.map(p => p.salutation).join('<br>');
