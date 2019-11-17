var User = (function () {
    function User(id, firstName, lastName, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
    }
    Object.defineProperty(User.prototype, "salutation", {
        get: function () {
            return "Hello, " + this.firstName + " " + this.lastName;
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
export { User };
//# sourceMappingURL=person.js.map