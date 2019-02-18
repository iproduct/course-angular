System.register([], function (exports_1, context_1) {
    "use strict";
    var LoginControllerImpl;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LoginControllerImpl = (function () {
                function LoginControllerImpl(repo) {
                    this.repo = repo;
                    this.loggedUser = undefined;
                }
                LoginControllerImpl.prototype.login = function (principal, credentials) {
                    var _this = this;
                    var email;
                    var password;
                    if (typeof principal === 'string') {
                        email = principal;
                        password = credentials;
                    }
                    else {
                        email = principal.email;
                        password = principal.password;
                    }
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            var user = _this.repo.findUserByEmail(email);
                            if (!user || password !== user.password) {
                                reject('Invalid username or password');
                            }
                            else {
                                _this.loggedUser = user;
                                resolve(user);
                            }
                        }, 1000);
                    });
                    return promise;
                };
                LoginControllerImpl.prototype.logout = function () {
                    var oldUser = this.loggedUser;
                    this.loggedUser = undefined;
                    return Promise.resolve(oldUser);
                };
                LoginControllerImpl.prototype.getCurrentUser = function () {
                    return this.loggedUser;
                };
                return LoginControllerImpl;
            }());
            exports_1("LoginControllerImpl", LoginControllerImpl);
        }
    };
});
//# sourceMappingURL=login-controller.js.map