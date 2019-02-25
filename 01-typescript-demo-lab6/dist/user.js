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
export var Role;
(function (Role) {
    Role[Role["USER"] = 1] = "USER";
    Role[Role["MANAGER"] = 2] = "MANAGER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
var UserBase = (function () {
    function UserBase(id, email, password, firstName, lastName, roles, contact) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.contact = contact;
    }
    Object.defineProperty(UserBase.prototype, "salutation", {
        get: function () {
            return this.firstName + " " + this.lastName + " in role: " + this.roles.join(', ');
        },
        enumerable: true,
        configurable: true
    });
    return UserBase;
}());
export { UserBase };
var User = (function (_super) {
    __extends(User, _super);
    function User(id, email, password, firstName, lastName, contact) {
        var _this = _super.call(this, id, email, password, firstName, lastName, [Role.USER], contact) || this;
        _this.id = id;
        _this.email = email;
        _this.password = password;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.contact = contact;
        return _this;
    }
    return User;
}(UserBase));
export { User };
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager(id, email, password, firstName, lastName, contact) {
        var _this = _super.call(this, id, email, password, firstName, lastName, [Role.MANAGER], contact) || this;
        _this.id = id;
        _this.email = email;
        _this.password = password;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.contact = contact;
        return _this;
    }
    return Manager;
}(UserBase));
export { Manager };
var Admin = (function (_super) {
    __extends(Admin, _super);
    function Admin(id, email, password, firstName, lastName, contact) {
        var _this = _super.call(this, id, email, password, firstName, lastName, [Role.ADMIN], contact) || this;
        _this.id = id;
        _this.email = email;
        _this.password = password;
        _this.firstName = firstName;
        _this.lastName = lastName;
        _this.contact = contact;
        return _this;
    }
    return Admin;
}(UserBase));
export { Admin };
//# sourceMappingURL=user.js.map