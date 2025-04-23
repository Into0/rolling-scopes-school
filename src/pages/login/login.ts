import './login.css';
import { button, div, fieldset, form, input, label } from '../../components/tags';
import Page from '../page';
import { validateUsername, validatePassword } from '../../utils/validation';
import { globalState } from '../../global-state';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  private loginBtn?: HTMLElement;

  constructor(socket) {
    super(socket);
    this.loginUser = this.loginUser.bind(this);
  }

  public loginUser(): void {
    globalState.username = nameValue;
    globalState.password = passValue;
    globalState.uniqueId = uniqueId;

    this.socket.sendLoginRequest(uniqueId, nameValue, passValue);

    setTimeout(() => {
      if (this.socket.lastError) {
        this.showError(this.socket.lastError);
        this.socket.lastError = undefined;
      } else {
        globalThis.location.hash = '/chat';
      }
    }, 100);
  }

  private showError(error) {
    const remove = () => {
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

  public handleInputChange(event, inputType): void {
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
        globalThis.location.hash = '/about';
      }),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
