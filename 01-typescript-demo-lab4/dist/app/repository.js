System.register([], function (exports_1, context_1) {
    "use strict";
    var DemoUserRepository;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DemoUserRepository = (function () {
                function DemoUserRepository() {
                    this.users = new Map();
                }
                DemoUserRepository.prototype.addUser = function (user) {
                    if (this.findUserByEmail(user.email)) {
                        throw "User with email " + user.email + " already exists.";
                    }
                    user.id = this.getNextId();
                    this.users.set(user.id, user);
                };
                DemoUserRepository.prototype.editUser = function (user) {
                    var found = this.findUserByEmail(user.email);
                    if (found && found.id !== user.id) {
                        throw "Another user with email " + user.email + " already exists.";
                    }
                    this.users.set(user.id, user);
                };
                DemoUserRepository.prototype.deleteUserById = function (id) {
                    this.users.delete(id);
                };
                DemoUserRepository.prototype.findUserById = function (id) {
                    return this.users.get(id);
                };
                DemoUserRepository.prototype.findUserByEmail = function (email) {
                    var result = undefined;
                    this.users.forEach(function (user) {
                        if (user.email === email) {
                            result = user;
                            return false;
                        }
                    });
                    return result;
                };
                DemoUserRepository.prototype.findAllUsers = function () {
                    return Array.from(this.users.values());
                };
                DemoUserRepository.prototype.getNextId = function () {
                    var maxId = 0;
                    this.users.forEach(function (user) {
                        if (user.id > maxId)
                            maxId = user.id;
                    });
                    return maxId + 1;
                };
                return DemoUserRepository;
            }());
            exports_1("DemoUserRepository", DemoUserRepository);
        }
    };
});
//# sourceMappingURL=repository.js.map