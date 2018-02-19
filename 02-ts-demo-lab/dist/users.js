System.register([], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __moduleName = context_1 && context_1.id;
    var Role, UserBase, Customer, Admin;
    return {
        setters: [],
        execute: function () {
            (function (Role) {
                Role[Role["ADMIN"] = 1] = "ADMIN";
                Role[Role["CUSTOMER"] = 2] = "CUSTOMER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            UserBase = /** @class */ (function () {
                function UserBase(firstName, lastName, email, password, roles, contact) {
                    if (roles === void 0) { roles = []; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.roles = roles;
                    this.contact = contact;
                    this.id = UserBase.nextId++;
                }
                Object.defineProperty(UserBase.prototype, "salutation", {
                    get: function () {
                        return this.firstName + " " + this.lastName + " \n          in roles: " + this.roles.map(function (role) { return Role[role]; }).join(", ");
                    },
                    enumerable: true,
                    configurable: true
                });
                UserBase.prototype.addRole = function (role) {
                    this.roles.push(role);
                };
                UserBase.nextId = 0;
                return UserBase;
            }());
            exports_1("UserBase", UserBase);
            Customer = /** @class */ (function (_super) {
                __extends(Customer, _super);
                function Customer(firstName, lastName, email, password, contact) {
                    var _this = _super.call(this, firstName, lastName, email, password, [Role.CUSTOMER], contact) || this;
                    _this.firstName = firstName;
                    _this.lastName = lastName;
                    _this.email = email;
                    _this.password = password;
                    _this.contact = contact;
                    return _this;
                }
                return Customer;
            }(UserBase));
            exports_1("Customer", Customer);
            Admin = /** @class */ (function (_super) {
                __extends(Admin, _super);
                function Admin(firstName, lastName, email, password, contact) {
                    var _this = _super.call(this, firstName, lastName, email, password, [Role.ADMIN], contact) || this;
                    _this.firstName = firstName;
                    _this.lastName = lastName;
                    _this.email = email;
                    _this.password = password;
                    _this.contact = contact;
                    return _this;
                }
                return Admin;
            }(UserBase));
            exports_1("Admin", Admin);
        }
    };
});
//# sourceMappingURL=users.js.map