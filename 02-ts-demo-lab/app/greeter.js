"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function greeter(person) {
    return 'Hello, ' + person + ' from Typescript!';
}
exports.default = greeter;
var user = 'TypeScript User';
document.body.innerHTML = greeter(user);
