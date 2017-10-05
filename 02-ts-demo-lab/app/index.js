"use strict";
exports.__esModule = true;
function greeter(name) {
    return "Hello, " + name + " from TypeScript!";
}
exports["default"] = greeter;
var user = "MyUser";
document.body.innerHTML = greeter(user);
