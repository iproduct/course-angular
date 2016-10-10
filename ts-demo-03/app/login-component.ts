import { LoginController } from './login-controller';
import $ from 'jquery';

export class LoginComponent {
    private messagesElement: JQuery;
    constructor(private jqElementSelector: string, private loginController: LoginController) {

        const keyboardEventHandler = (event: JQueryKeyEventObject) => {
            if (event.keyCode === 13) {
                loginEventHandler();
            }
        };

        const loginEventHandler = () => {
            this.loginController.login(usernameInputElem.val(), passwordInputElem.val())
            .then(() => {
                this.showCurrentUser();
            }).catch(err => {
                this.showError(err);
            });
            return false;
        };

        const logoutEventHandler = () => {
            this.loginController.logout()
            .then(() => {
                this.showCurrentUser();
            }).catch(err => {
                this.showError(err);
            });
            return false;
        };

        const formElem = $("<form class='form-inline' role='form'>").addClass('form-inline');
        const usernameInputElem =
            $("<input id='username' type='email' placeholder='email'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const passwordInputElem =
            $("<input id='password' type='password' placeholder='password' autocomplete='off'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const loginButtonElem =
            $('<button>Login</buttton>').addClass('btn btn-primary')
            .click(loginEventHandler);
        const logoutButtonElem =
            $('<button>Logout</buttton>').addClass('btn btn-default')
            .click(logoutEventHandler);

        // build the login form
        formElem.append(usernameInputElem);
        formElem.append(passwordInputElem);
        formElem.append(loginButtonElem);
        formElem.append(logoutButtonElem);
        this.messagesElement = $('<div id="message" class="well well-lg">');
        $(jqElementSelector).append(formElem).append(this.messagesElement);

        this.showCurrentUser();
    }

    public showCurrentUser(): void {
        let user = this.loginController.getCurrentUser();
        this.messagesElement.html(user ? `Welcome ${user.salutation}.` : `No user is logged in.`);
    }

    public showError(error: any): void {
        this.messagesElement.html(`ERROR: ${error}.`);
    }
}
