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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { RepositoryImpl } from "./repository.js";
import { resolvePromiseAfterTimeout } from "./utilities.js";
import { validate, required, minLength } from './decorators.js';
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
        try {
            return this.loginImpl(principal, credentials);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    DemoLoginController.prototype.loginImpl = function (principal, credentials) {
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
                    reject(new Error("Invalid username or password"));
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
    __decorate([
        validate,
        __param(0, required), __param(0, minLength(2)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, String]),
        __metadata("design:returntype", Promise)
    ], DemoLoginController.prototype, "loginImpl", null);
    return DemoLoginController;
}());
export { DemoLoginController };
//# sourceMappingURL=controller.js.map