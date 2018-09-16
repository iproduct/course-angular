System.register(["./repository", "./controller", "./users", "./login-component"], function (exports_1, context_1) {
    "use strict";
    var repository_1, controller_1, users_1, login_component_1, userRepo, loginController, loginComponent, RepositoryImpl, userRepoGeneric, mockData;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (repository_1_1) {
                repository_1 = repository_1_1;
            },
            function (controller_1_1) {
                controller_1 = controller_1_1;
            },
            function (users_1_1) {
                users_1 = users_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            }
        ],
        execute: function () {
            userRepo = new repository_1.DemoUserRepository();
            userRepo.addUser(new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john'));
            userRepo.addUser(new users_1.Customer('Sara', 'Smith', 'sara@abv.bg', 'sara'));
            userRepo.addUser(new users_1.Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian'));
            for (var _i = 0, _a = userRepo.findAllUsers(); _i < _a.length; _i++) {
                var val = _a[_i];
                console.log(val);
            }
            loginController = new controller_1.DemoLoginController(userRepo);
            loginComponent = new login_component_1.LoginComponent('#content', loginController);
            console.log(new users_1.PhysicalPerson('Ivan', 'Donchev', 'Petrov').salutation);
            RepositoryImpl = (function () {
                function RepositoryImpl() {
                    this.data = new Map();
                }
                RepositoryImpl.prototype.add = function (id, value) {
                    value.id = id;
                    this.data.set(id, value);
                };
                RepositoryImpl.prototype.update = function (value) {
                    this.data.set(value.id, value);
                    return value;
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
            userRepoGeneric = new RepositoryImpl();
            mockData = [
                ["123456789abcdefghijklmn", new users_1.Customer('John', 'Smith', 'john@abv.bg', 'john')],
                ["223456789abcdefghijklmn", new users_1.Customer('Sara', 'Smith', 'sara@abv.bg', 'sara')],
                ["323456789abcdefghijklmn", new users_1.Admin('Brian', 'Harisson', 'brian@gmail.com', 'brian')]
            ];
            mockData.forEach(function (entry) { return userRepoGeneric.add(entry[0], entry[1]); });
            userRepoGeneric.findAll().map(function (u) { return u.salutation; }).forEach(function (msg) { return console.log(msg); });
        }
    };
});
//# sourceMappingURL=index.js.map