System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Role, UserImpl, Customer, Operator, Admin;
    return {
        setters:[],
        execute: function() {
            (function (Role) {
                Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
                Role[Role["OPERATOR"] = 2] = "OPERATOR";
                Role[Role["ADMIN"] = 3] = "ADMIN";
            })(Role || (Role = {}));
            exports_1("Role", Role);
            UserImpl = (function () {
                function UserImpl(firstName, lastName, email, password, role, contact) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                    this.email = email;
                    this.password = password;
                    this.role = role;
                    this.contact = contact;
                    this.id = undefined;
                }
                Object.defineProperty(UserImpl.prototype, "salutation", {
                    get: function () {
                        var roleStr = Role[this.role];
                        return this.firstName + " " + this.lastName + " in role " + roleStr;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UserImpl;
            }());
            Customer = (function (_super) {
                __extends(Customer, _super);
                function Customer(firstName, lastName, email, password, contact) {
                    _super.call(this, firstName, lastName, email, password, Role.CUSTOMER, contact);
                }
                return Customer;
            }(UserImpl));
            exports_1("Customer", Customer);
            Operator = (function (_super) {
                __extends(Operator, _super);
                function Operator(firstName, lastName, email, password, contact) {
                    _super.call(this, firstName, lastName, email, password, Role.OPERATOR, contact);
                }
                return Operator;
            }(UserImpl));
            exports_1("Operator", Operator);
            Admin = (function (_super) {
                __extends(Admin, _super);
                function Admin(firstName, lastName, email, password, contact) {
                    _super.call(this, firstName, lastName, email, password, Role.ADMIN, contact);
                }
                return Admin;
            }(UserImpl));
            exports_1("Admin", Admin);
        }
    }
});
//# sourceMappingURL=users.js.map