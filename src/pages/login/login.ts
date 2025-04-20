import './login.css';
import { button, div, fieldset, form, input, label } from '../../components/tags';
import Page from '../page';
import { validateUsername, validatePassword } from '../../utils/validation';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  constructor() {
    super();
    this.sendLogin = this.sendLogin.bind(this);
  }

  public sendLogin(): void {
    this.socket.sendLoginRequest(uniqueId, nameValue, passValue);
  }

  public handleInputChange(event, inputType): void {
    const value = event.target.value;
    const inputContainer = event.target.parentElement;
    let validResult;

    if (inputType === 'username') {
      validResult = validateUsername(value);
      nameValue = value;
    }

    if (inputType === 'password') {
      validResult = validatePassword(value);
      passValue = value;
    }

    if (inputContainer.lastChild.tagName === 'LABEL') {
      inputContainer.lastChild.remove();
    }

    if (!validResult.isValid) {
      inputContainer.append(validResult.errorLabel.getNode());
    }
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
      button('login-btn btn', 'login', 'button', this.sendLogin),
      button('about-btn btn', 'about', 'button'),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
