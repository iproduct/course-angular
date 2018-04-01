System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserRepository;
    return {
        setters: [],
        execute: function () {
            UserRepository = /** @class */ (function () {
                function UserRepository() {
                    this.users = new Map();
                }
                UserRepository.prototype.add = function (user) {
                    if (this.findUserByEmail(user.email)) {
                        throw "User with email " + user.email + " already exists.";
                    }
                    var nextId = this.getNextId();
                    user.id = nextId;
                    this.users.set(nextId, user);
                    return user;
                };
                UserRepository.prototype.update = function (user) {
                    var found = this.findUserByEmail(user.email);
                    if (found && found.id !== user.id) {
                        throw "Another user with email " + user.email + " already exists.";
                    }
                    this.users.set(user.id, user);
                    return user;
                };
                UserRepository.prototype.delete = function (id) {
                    var found = this.findById(id);
                    if (this.users.delete(id))
                        return found;
                    else
                        return null;
                };
                UserRepository.prototype.findById = function (id) {
                    return this.users.get(id);
                };
                UserRepository.prototype.findAll = function () {
                    return Array.from(this.users.values());
                };
                UserRepository.prototype.findUserByEmail = function (email) {
                    var result = undefined;
                    this.users.forEach(function (user) {
                        if (user.email === email) {
                            result = user;
                            return false;
                        }
                    });
                    return result;
                };
                UserRepository.prototype.getNextId = function () {
                    var maxId = 0;
                    this.users.forEach(function (user) {
                        if (user.id > maxId)
                            maxId = user.id;
                    });
                    return maxId + 1;
                };
                return UserRepository;
            }());
            exports_1("UserRepository", UserRepository);
        }
    };
});
//# sourceMappingURL=user-repository.js.map