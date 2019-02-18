System.register(["./user-dao", "./users", "./login-controller", "./login-component"], function (exports_1, context_1) {
    "use strict";
    var user_dao_1, users_1, login_controller_1, login_component_1, user1, userRepo, controller, loginComp;
    var __moduleName = context_1 && context_1.id;
    function greeter(person) {
        return 'Hello, ' + person.firstName + ' ' + person.lastName + ' from Typescript!';
    }
    return {
        setters: [
            function (user_dao_1_1) {
                user_dao_1 = user_dao_1_1;
            },
            function (users_1_1) {
                users_1 = users_1_1;
            },
            function (login_controller_1_1) {
                login_controller_1 = login_controller_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }
        ],
        execute: function () {
            user1 = {
                firstName: 'John',
                lastName: 'Smith'
            };
            userRepo = new user_dao_1.DemoUserRepository();
            userRepo.addUser(new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john'));
            userRepo.addUser(new users_1.Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
            userRepo.addUser(new users_1.Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));
            userRepo.findAllUsers().forEach(function (user) { return console.log(user); });
            controller = new login_controller_1.LoginControllerImpl(userRepo);
            loginComp = new login_component_1.LoginComponent("#content", controller);
        }
    };
});
//# sourceMappingURL=index.js.map