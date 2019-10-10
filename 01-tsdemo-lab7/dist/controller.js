var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RepositoryImpl } from "./repository.js";
import { resolvePromiseAfterTimeout } from "./utilities.js";
var UserRepository = (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserRepository.prototype.findUserByEmail = function (email) {
        return this.findAll().find(function (u) { return u.email === email; });
    };
    return UserRepository;
}(RepositoryImpl));
export { UserRepository };
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