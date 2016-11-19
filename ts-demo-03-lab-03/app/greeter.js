'use strict';
function greeter(person) {
    return 'Hello, ' + person + ' from Typescript!';
}
exports.__esModule = true;
exports["default"] = greeter;
var user = 'TypeScript User';
document.body.innerHTML = greeter(user);
