import { LoginController } from './controller';
import '../node_modules/jquery/dist/jquery.js';

export class LoginComponent {
    private messagesElement: JQuery;
    constructor(private jqElementSelector: string, private loginController: LoginController) {

        const keyboardEventHandler = (event: JQuery.Event) => {
            if (event.keyCode === 13) {
                loginEventHandler();
            }
        };

        const loginEventHandler: any = () => {
            this.loginController.login(usernameInputElem.val() as string, passwordInputElem.val() as string)
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
        const usernameInputElem: JQuery<HTMLElement> =
            $("<input id='username' type='email' placeholder='email'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const passwordInputElem: JQuery<HTMLElement> =
            $("<input id='password' type='password' placeholder='password' autocomplete='off'>")
            .addClass('form-control').bind('keypress', keyboardEventHandler);
        const loginButtonElem: JQuery<HTMLElement> =
            $('<button>Login</buttton>').addClass('btn btn-primary')
            .click(loginEventHandler);
        const logoutButtonElem: JQuery<HTMLElement> =
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
        const user = this.loginController.getCurrentUser();
        this.messagesElement.html(user ? `Welcome ${user.salutation}.` : `No user is logged in.`);
    }

    public showError(error: any): void {
        this.messagesElement.html(`ERROR: ${error}.`);
    }
}
