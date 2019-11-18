import '../node_modules/jquery/dist/jquery.js';
var LoginComponent = (function () {
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
        var formElem = $("<form class='form-inline' role='form'>").addClass('form-inline');
        var usernameInputElem = $("<input id='username' type='email' placeholder='email'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        var passwordInputElem = $("<input id='password' type='password' placeholder='password' autocomplete='off'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        var loginButtonElem = $('<button type="button">Login</buttton>').addClass('btn btn-primary')
            .click(loginEventHandler);
        var logoutButtonElem = $('<button type="button">Logout</buttton>').addClass('btn btn-default')
            .click(logoutEventHandler);
        formElem.append(usernameInputElem);
        formElem.append(passwordInputElem);
        formElem.append(loginButtonElem);
        formElem.append(logoutButtonElem);
        this.messagesElement = $('<div id="message" class="well well-lg">');
        $(jqElementSelector).append(formElem).append(this.messagesElement);
        this.showCurrentUser();
    }
    LoginComponent.prototype.showCurrentUser = function () {
        var user = this.loginController.getCurrentUser();
        this.messagesElement.html(user ? "Welcome " + user.salutation + "." : "No user is logged in.");
    };
    LoginComponent.prototype.showError = function (error) {
        this.messagesElement.html(error);
    };
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login-component.js.map