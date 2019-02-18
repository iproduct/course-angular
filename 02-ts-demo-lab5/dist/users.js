System.register([], function (exports_1, context_1) {
    "use strict";
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
    var Role, UserImpl, Customer, Admin, Manager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (Role) {
                Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
                Role[Role["MANAGER"] = 2] = "MANAGER";
                Role[Role["ADMIN"] = 3] = "ADMIN";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            UserImpl = (function () {
                function UserImpl(firstName, lastName, email, password, roles, contact) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.roles = roles;
                    this.contact = contact;
                }
                Object.defineProperty(UserImpl.prototype, "salutation", {
                    get: function () {
                        return this.id + ": " + this.firstName + " " + this.lastName + " in role " + Role[this.roles[0]];
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                return UserImpl;
            }());
            exports_1("UserImpl", UserImpl);
            Customer = (function (_super) {
                __extends(Customer, _super);
                function Customer(firstName, lastName, email, password, roles, contact) {
                    return _super.call(this, firstName, lastName, email, password, roles ? roles : [Role.CUSTOMER], contact) || this;
                }
                return Customer;
            }(UserImpl));
            exports_1("Customer", Customer);
            Admin = (function (_super) {
                __extends(Admin, _super);
                function Admin(firstName, lastName, email, password, roles, contact) {
                    return _super.call(this, firstName, lastName, email, password, roles ? roles : [Role.ADMIN], contact) || this;
                }
                return Admin;
            }(UserImpl));
            exports_1("Admin", Admin);
            Manager = (function (_super) {
                __extends(Manager, _super);
                function Manager(firstName, lastName, email, password, roles, contact) {
                    return _super.call(this, firstName, lastName, email, password, roles ? roles : [Role.MANAGER], contact) || this;
                }
                return Manager;
            }(UserImpl));
            exports_1("Manager", Manager);
        }
    };
});
//# sourceMappingURL=users.js.map