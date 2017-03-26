'use strict';
function greeter(person) {
    return 'Hello, ' + person + ' from Typescript and Angular!';
}
var user = 'TypeScript User';
document.body.innerHTML = greeter(user);
