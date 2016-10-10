System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role, Customer, Admin, PhysicalPerson;
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
            PhysicalPerson = (function () {
                function PhysicalPerson(firstName) {
                    var restNames = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        restNames[_i - 1] = arguments[_i];
                    }
                    this.firstName = firstName;
                    this.restNames = restNames;
                }
                Object.defineProperty(PhysicalPerson.prototype, "salutation", {
                    get: function () {
                        var salutation = this.firstName;
                        for (var _i = 0, _a = this.restNames; _i < _a.length; _i++) {
                            var name_1 = _a[_i];
                            salutation += ' ' + name_1;
                        }
                        return salutation;
                    },
                    enumerable: true,
                    configurable: true
                });
                return PhysicalPerson;
            }());
            exports_1("PhysicalPerson", PhysicalPerson);
        }
    }
});
//# sourceMappingURL=users.js.map