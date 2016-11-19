System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UserRepositoryImpl;
    return {
        setters:[],
        execute: function() {
            // interface UserMap {
            //   [id: number]: User;
            // }
            UserRepositoryImpl = (function () {
                function UserRepositoryImpl() {
                    this.users = new Map();
                }
                UserRepositoryImpl.prototype.addUser = function (user) {
                    user.id = ++UserRepositoryImpl.nextId;
                    this.users.set(user.id, user);
                    // this.users[user.id] = user;
                    return user;
                };
                UserRepositoryImpl.prototype.findAll = function () {
                    var result = [];
                    this.users.forEach(function (user) { return result.push(user); });
                    // for (let userId in this.users) {
                    //   if (this.users.hasOwnProperty(userId)) {
                    //     result.push(this.users[userId]);
                    //   }
                    // }
                    return result;
                };
                UserRepositoryImpl.nextId = 0;
                return UserRepositoryImpl;
            }());
            exports_1("UserRepositoryImpl", UserRepositoryImpl);
        }
    }
});
//# sourceMappingURL=repository.js.map