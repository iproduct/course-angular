export var Role;
(function (Role) {
    Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
    Role[Role["MANAGER"] = 2] = "MANAGER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
    constructor(id, firstName, lastName, email, password, roles, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    get salutation() {
        return `${this.firstName} ${this.lastName} in role: 
            ${this.roles.map(role => Role[role]).join(", ")}`;
    }
}
//# sourceMappingURL=user.js.map