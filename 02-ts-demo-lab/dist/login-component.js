System.register(["jquery"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jquery_1, LoginComponent;
    return {
        setters: [
            function (jquery_1_1) {
                jquery_1 = jquery_1_1;
            }
        ],
        execute: function () {
            LoginComponent = /** @class */ (function () {
                function LoginComponent(jqElementSelector, loginController) {
                    var _this = this;
                    this.jqElementSelector = jqElementSelector;
                    this.loginController = loginController;
                    var keyboardEventHandler = function (event) {
                        if (event.keyCode === 13) {
                            loginEventHandler();
                        }
                    };
                    var loginEventHandler = function () {
                        _this.loginController.login(usernameInputElem.val(), passwordInputElem.val())
                            .then(function () {
                            _this.showCurrentUser();
                        }).catch(function (err) {
                            _this.showError(err);
                        });
                        return false;
                    };
                    var logoutEventHandler = function () {
                        _this.loginController.logout()
                            .then(function () {
                            _this.showCurrentUser();
                        }).catch(function (err) {
                            _this.showError(err);
                        });
                        return false;
                    };
                    var formElem = jquery_1.default("<form class='form-inline' role='form'>").addClass('form-inline');
                    var usernameInputElem = jquery_1.default("<input id='username' type='email' placeholder='email'>")
                        .addClass('form-control').bind('keypress', keyboardEventHandler);
                    var passwordInputElem = jquery_1.default("<input id='password' type='password' placeholder='password' autocomplete='off'>")
                        .addClass('form-control').bind('keypress', keyboardEventHandler);
                    var loginButtonElem = jquery_1.default('<button>Login</buttton>').addClass('btn btn-primary')
                        .click(loginEventHandler);
                    var logoutButtonElem = jquery_1.default('<button>Logout</buttton>').addClass('btn btn-default')
                        .click(logoutEventHandler);
                    // build the login form
                    formElem.append(usernameInputElem);
                    formElem.append(passwordInputElem);
                    formElem.append(loginButtonElem);
                    formElem.append(logoutButtonElem);
                    this.messagesElement = jquery_1.default('<div id="message" class="well well-lg">');
                    jquery_1.default(jqElementSelector).append(formElem).append(this.messagesElement);
                    this.showCurrentUser();
                }
                LoginComponent.prototype.showCurrentUser = function () {
                    var user = this.loginController.getCurrentUser();
                    this.messagesElement.html(user ? "Welcome " + user.salutation + "." : "No user is logged in.");
                };
                LoginComponent.prototype.showError = function (error) {
                    this.messagesElement.html("ERROR: " + error + ".");
                };
                return LoginComponent;
            }());
            exports_1("LoginComponent", LoginComponent);
        }
    };
});
//# sourceMappingURL=login-component.js.map