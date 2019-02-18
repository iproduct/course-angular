"use strict";
function greeter(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName + ' from Typescript!';
}
var user1 = {
    firstName: 'John',
    lastName: 'Smith'
};
document.getElementById('content').innerHTML = greeter(user1);
//# sourceMappingURL=index.js.map