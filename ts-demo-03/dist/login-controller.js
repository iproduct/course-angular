System.register(['./utilities'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var utilities_1;
    var DemoLoginController;
    return {
        setters:[
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            DemoLoginController = (function () {
                function DemoLoginController(repository) {
                    this.repository = repository;
                    this.loggedUser = undefined;
                }
                DemoLoginController.prototype.login = function (principal, credentials) {
                    var _this = this;
                    var email;
                    var password;
                    if (typeof principal === 'User') {
                        email = principal.email;
                        password = principal.password;
                    }
                    else {
                        email = principal;
                        password = credentials;
                    }
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            var user = _this.repository.findUserByEmail(email);
                            if (!user || user.password !== password) {
                                reject("Invalid username or password");
                            }
                            _this.loggedUser = user;
                            resolve(user);
                        }, 1000);
                    });
                    return promise;
                };
                DemoLoginController.prototype.logout = function () {
                    this.loggedUser = undefined;
                    return utilities_1.resolvePromiseAfterTimeout(this.getCurrentUser(), 500);
                };
                DemoLoginController.prototype.getCurrentUser = function () {
                    return this.loggedUser;
                };
                return DemoLoginController;
            }());
            exports_1("DemoLoginController", DemoLoginController);
        }
    }
});
//# sourceMappingURL=login-controller.js.map