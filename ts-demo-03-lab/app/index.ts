import {Customer} from './users';

let user = new Customer('John', 'Smith', 'john@abv.bg', 'john', {});
document.body.innerHTML = user.getSalutation();
