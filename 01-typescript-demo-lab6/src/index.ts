import {greeter} from './greeter.js';

const user = 'TypeScript User';
document.body.innerHTML = greeter({firstName: 'John', lastName:'Smith'});