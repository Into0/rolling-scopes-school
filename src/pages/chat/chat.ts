import './chat.css';
import { a, article, aside, button, div, img, input, section, span, ul } from '../../components/tags';
import Page from '../page';
import { globalState } from '../../global-state';
import type Socket from '../../socket/socket';

class ChatPage extends Page {
  constructor(socket: Socket) {
    super(socket);
    this.logoutUser = this.logoutUser.bind(this);
  }

  public logoutUser(): void {
    if (this.socket) {
      this.socket.sendLogoutRequest(globalState.uniqueId, globalState.username, globalState.password);
      this.socket.userLogined = false;
      this.changeRoute(this.loginPage);
    }
  }

  public render(): HTMLElement {
    const chat = div(
      'wrapper',
      section(
        'header',
        article('header-wrapper', span('user', `user: ${globalState.username}`), span('title', 'fun chat')),
        button('header-about btn', 'about', 'button', () => {
          this.changeRoute(this.aboutPage);
        }),
        button('logout-btn btn', 'logout', 'button', this.logoutUser),
      ),
      section(
        'content',
        aside('contacts', input('search', '', 'search'), ul('user-list', div(''))),
        article('dialog-container'),
      ),
      section(
        'footer',
        div('rss', img('rss-logo', '/rss-logo.svg'), a('footer-rss', 'https://rs.school/', 'RSSchool')),
        a('footer-link', 'https://github.com/into0', 'into0'),
        span('footer-year', '2025'),
      ),
    );

    this.container.append(chat.getNode());
    return this.container;
  }
}

export default ChatPage;
