System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Role, UserImpl, Customer, Admin;
    return {
        setters:[],
        execute: function() {
            (function (Role) {
                Role[Role["ADMIN"] = 1] = "ADMIN";
                Role[Role["CUSTOMER"] = 2] = "CUSTOMER";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            UserImpl = (function () {
                function UserImpl(firstName, lastName, email, password, contact, roles) {
                    if (roles === void 0) { roles = [Role.CUSTOMER]; }
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.contact = contact;
                    this.roles = roles;
                }
                Object.defineProperty(UserImpl.prototype, "salutation", {
                    get: function () {
                        var roleStr = this.roles.map(function (role) { return Role[role]; }).join(', ');
                        // for (let role of this.roles) {
                        //     roleStr += Role[role] + ' ';
                        // }
                        return this.firstName + " " + this.lastName + " in roles: " + roleStr;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UserImpl;
            }());
            Customer = (function (_super) {
                __extends(Customer, _super);
                function Customer(firstName, lastName, email, password, contact) {
                    _super.call(this, firstName, lastName, email, password, contact);
                }
                return Customer;
            }(UserImpl));
            exports_1("Customer", Customer);
            Admin = (function (_super) {
                __extends(Admin, _super);
                function Admin(firstName, lastName, email, password, contact, roles) {
                    if (roles === void 0) { roles = [Role.ADMIN]; }
                    _super.call(this, firstName, lastName, email, password, contact, roles);
                }
                return Admin;
            }(UserImpl));
            exports_1("Admin", Admin);
        }
    }
});
//# sourceMappingURL=users.js.map