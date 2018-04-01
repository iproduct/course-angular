System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, Customer, Admin;
    return {
        setters: [],
        execute: function () {
            (function (Role) {
                Role[Role["ADMIN"] = 1] = "ADMIN";
                Role[Role["CUSTOMER"] = 2] = "CUSTOMER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            Customer = /** @class */ (function () {
                function Customer(firstName, lastName, email, password, contacts, roles) {
                    if (roles === void 0) { roles = [Role.CUSTOMER]; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.contacts = contacts;
                    this.roles = roles;
                }
                Object.defineProperty(Customer.prototype, "salutation", {
                    get: function () {
                        return this.firstName + " " + this.lastName + " in role " + Role[this.roles[0]];
                    },
                    enumerable: true,
                    configurable: true
                });
                return Customer;
            }());
            exports_1("Customer", Customer);
            Admin = /** @class */ (function () {
                function Admin(firstName, lastName, email, password, contacts, roles) {
                    if (roles === void 0) { roles = [Role.ADMIN]; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.contacts = contacts;
                    this.roles = roles;
                }
                Object.defineProperty(Admin.prototype, "salutation", {
                    get: function () {
                        return this.firstName + " " + this.lastName + " in role " + Role[this.roles[0]];
                    },
                    enumerable: true,
                    configurable: true
                });
                return Admin;
            }());
            exports_1("Admin", Admin);
        }
    };
});
//# sourceMappingURL=users.js.map