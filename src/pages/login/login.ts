import './login.css';
import { button, div, fieldset, form, input, label } from '../../components/tags';
import AboutPage from '../about/about';
import Page from '../page';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.test = this.test.bind(this);
  }

  login() {
    this.socket.sendLoginRequest(uniqueId, nameValue, passValue);
  }

  test() {
    this.socket.sendUsersRequest(uniqueId, 'USER_INACTIVE');
    new AboutPage().render();
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
            input('field-input', 'text', 'enter name', (event) => {
              console.log(event.target.value);
              nameValue = event.target.value;
            }),
          ),
        ),
        div(
          'field-container',
          label('pass'),
          div(
            'input-container',
            input('field-input', 'password', 'enter password', (event) => {
              console.log(event.target.value);
              passValue = event.target.value;
            }),
          ),
        ),
      ),
      button('login-btn btn', 'login', 'button', this.login),
      button('about-btn btn', 'about', 'button', this.test),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
