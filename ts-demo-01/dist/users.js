System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, Customer, Admin;
    return {
        setters:[],
        execute: function() {
            (function (Role) {
                Role[Role["ADMIN"] = 0] = "ADMIN";
                Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            Customer = (function () {
                function Customer(firstName, lastName, email, password, contacts, roles) {
                    if (roles === void 0) { roles = [Role.CUSTOMER]; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.contacts = contacts;
                    this.roles = roles;
                }
                Customer.prototype.getSalutation = function () {
                    return this.firstName + " " + this.lastName + " in role " + Role[this.roles[0]];
                };
                return Customer;
            }());
            exports_1("Customer", Customer);
            Admin = (function () {
                function Admin(firstName, lastName, email, password, contacts, roles) {
                    if (roles === void 0) { roles = [Role.ADMIN]; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.contacts = contacts;
                    this.roles = roles;
                }
                Admin.prototype.getSalutation = function () {
                    return this.firstName + " " + this.lastName + " in role " + Role[this.roles[0]];
                };
                return Admin;
            }());
            exports_1("Admin", Admin);
        }
    }
});
//# sourceMappingURL=users.js.map