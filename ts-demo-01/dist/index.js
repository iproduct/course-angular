System.register(['./user-repository', './login-controller', './users', './login-component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_repository_1, login_controller_1, users_1, login_component_1;
    var userRepo, loginController, loginComponent;
    return {
        setters:[
            function (user_repository_1_1) {
                user_repository_1 = user_repository_1_1;
            },
            function (login_controller_1_1) {
                login_controller_1 = login_controller_1_1;
            },
            function (users_1_1) {
                users_1 = users_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }],
        execute: function() {
            userRepo = new user_repository_1.DemoUserRepository();
            userRepo.addUser(new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john'));
            userRepo.addUser(new users_1.Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
            userRepo.addUser(new users_1.Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));
            loginController = new login_controller_1.DemoLoginController(userRepo);
            // loginController.login('john@abv.bg', 'john');
            // let user = 'TypeScript User';
            // document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );
            loginComponent = new login_component_1.LoginComponent('#content', loginController);
        }
    }
});
//# sourceMappingURL=index.js.map