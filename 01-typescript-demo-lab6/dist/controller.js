import { resolvePromiseAfterTimeout } from "./utilities.js";
var DemoLoginController = (function () {
    function DemoLoginController(repository) {
        this.repository = repository;
        this.loggedUser = undefined;
    }
    DemoLoginController.prototype.login = function (principal, credentials) {
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
        var user = this.getCurrentUser();
        this.loggedUser = undefined;
        return resolvePromiseAfterTimeout(user, 500);
    };
    DemoLoginController.prototype.getCurrentUser = function () {
        return this.loggedUser;
    };
    return DemoLoginController;
}());
export { DemoLoginController };
//# sourceMappingURL=controller.js.map