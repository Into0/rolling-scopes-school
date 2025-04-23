import './login.css';
import { button, div, fieldset, form, input, label } from '../../components/tags';
import Page from '../page';
import { validateUsername, validatePassword } from '../../utils/validation';
import { globalState } from '../../global-state';
import type Component from '../../components/component';
import type Socket from '../../socket/socket';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  private loginBtn?: Component;

  constructor(socket: Socket) {
    super(socket);
    this.loginUser = this.loginUser.bind(this);
  }

  public loginUser(): void {
    globalState.username = nameValue;
    globalState.password = passValue;
    globalState.uniqueId = uniqueId;

    if (this.socket) {
      this.socket.sendLoginRequest(uniqueId, nameValue, passValue);
    }

    setTimeout(() => {
      if (this.socket?.lastError) {
        this.showError(this.socket.lastError);
        this.socket.lastError = undefined;
      } else {
        this.changeRoute(this.chatPage);
      }
    }, 100);
  }

  public showError(error: string): void {
    const remove = (): void => {
      modalElement.destroy();
    };
    const modalElement = div(
      'modal',
      div('modal-wrapper', label(`${error}`), button('modal-button', 'OK', 'button', remove)),
    );

    if (error) {
      this.container.append(modalElement.getNode());
    }
  }

  public updateLoginButtonState(): void {
    const isUsernameValid = validateUsername(nameValue).isValid;
    const isPasswordValid = validatePassword(passValue).isValid;

    if (isUsernameValid && isPasswordValid) {
      this.loginBtn?.removeAttribute('disabled');
    } else {
      this.loginBtn?.setAttribute('disabled', 'true');
    }
  }

  public handleInputChange(event: Event, inputType: string): void {
    const value = event.target.value;
    const inputContainer = event.target.parentElement;
    let result;

    if (inputType === 'username') {
      result = validateUsername(value);
      nameValue = value;
    }

    if (inputType === 'password') {
      result = validatePassword(value);
      passValue = value;
    }

    if (inputContainer.lastChild.tagName === 'LABEL') {
      inputContainer.lastChild.remove();
    }

    if (!result.isValid) {
      inputContainer.append(result.errorLabel.getNode());
    }

    this.updateLoginButtonState();
  }

  public render(): HTMLElement {
    const loginForm = form(
      'login-form',
      fieldset(
        'fields',
        div(
          'field-container',
          label('name'),
          div(
            'input-container',
            input('field-input', 'text', 'enter name', (event) => this.handleInputChange(event, 'username')),
          ),
        ),
        div(
          'field-container',
          label('pass'),
          div(
            'input-container',
            input('field-input', 'password', 'enter password', (event) => this.handleInputChange(event, 'password')),
          ),
        ),
      ),
      (this.loginBtn = button('login-btn btn', 'login', 'button', this.loginUser, 'disabled')),
      button('about-btn btn', 'about', 'button', () => {
        this.changeRoute(this.aboutPage);
      }),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
