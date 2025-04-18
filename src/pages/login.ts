import { button, div, fieldset, form, input, label } from '../components/tags';
import Socket from '../socket/socket';
import AboutPage from './about';
import Page from './page';

let nameValue = '';
let passValue = '';
const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2);

class LoginPage extends Page {
  login() {
    new Socket().sendLoginRequest(uniqueId, nameValue, passValue);
  }

  test() {
    new Socket().sendUsersRequest(uniqueId, 'USER_ACTIVE');
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
      button('info-btn btn', 'about', 'button', this.test),
    );

    this.container.append(loginForm.getNode());
    return this.container;
  }
}

export default LoginPage;
