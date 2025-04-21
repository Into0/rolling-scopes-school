import './login.css';
import { button, div, fieldset, form, input, label } from '../../components/tags';
import Page from '../page';
import { validateUsername, validatePassword } from '../../utils/validation';
import { globalState } from '../../global-state';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  private loginBtn;

  constructor(socket) {
    super(socket);
    this.sendLogin = this.sendLogin.bind(this);
    this.loginBtn = this.loginBtn;
  }

  public sendLogin(): void {
    globalState.username = nameValue;
    globalState.password = passValue;
    globalState.uniqueId = uniqueId;

    this.socket.sendLoginRequest(uniqueId, nameValue, passValue);
    globalThis.location.hash = '/chat';
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
      (this.loginBtn = button('login-btn btn', 'login', 'button', this.sendLogin, 'disabled')),
      button('about-btn btn', 'about', 'button', () => {
        globalThis.location.hash = '/about';
      }),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
