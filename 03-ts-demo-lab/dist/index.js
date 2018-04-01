System.register(["./user-repository", "./login-controller", "./users", "./login-component"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_repository_1, login_controller_1, users_1, login_component_1, john, sara, userRepo, loginController, loginComponent, RepositoryImpl;
    return {
        setters: [
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
            }
        ],
        execute: function () {
            john = new users_1.Customer('John', 'Smith', 'john@gmail.com', 'john');
            sara = new users_1.Admin('Sara', 'Smith', 'sara@gmail.com', 'sara');
            console.log(john.salutation);
            console.log(sara.salutation);
            userRepo = new user_repository_1.UserRepository();
            userRepo.add(new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john'));
            userRepo.add(new users_1.Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
            userRepo.add(new users_1.Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));
            for (var _i = 0, _a = userRepo.findAll(); _i < _a.length; _i++) {
                var val = _a[_i];
                console.log(val);
            }
            loginController = new login_controller_1.DemoLoginController(userRepo);
            // loginController.login('john@abv.bg', 'john');
            // let user = 'TypeScript User';
            // document.getElementById('content').innerHTML = JSON.stringify( loginController.getCurrentUser() );
            loginComponent = new login_component_1.LoginComponent('#content', loginController);
            RepositoryImpl = /** @class */ (function () {
                function RepositoryImpl() {
                    this.data = new Map();
                }
                RepositoryImpl.prototype.add = function (key, value) {
                    this.data.set(key, value);
                };
                RepositoryImpl.prototype.findById = function (id) {
                    return this.data.get(id);
                };
                RepositoryImpl.prototype.findAll = function () {
                    var results = [];
                    this.data.forEach(function (item) { return results.push(item); });
                    return results;
                };
                return RepositoryImpl;
            }());
            exports_1("RepositoryImpl", RepositoryImpl);
            // const userRepoGeneric: Repository<User> = new RepositoryImpl<User>();
            // const mockData: Array<[number, User]> = [
            //   [1, new Customer('John', 'Smith', 'john@abv.bg', 'john')],
            //   [2, new Customer('Sara', 'Smith', 'sara@abv.bg', 'sara')]
            // ];
            // mockData.forEach(entry => userRepoGeneric.add(entry[0], entry[1]));
            // console.log(userRepoGeneric.findAll().map(u => u.salutation));
        }
    };
});
//# sourceMappingURL=index.js.map