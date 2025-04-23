import './chat.css';
import { a, article, aside, button, div, input, section, span, ul } from '../../components/tags';
import Page from '../page';
import { globalState } from '../../global-state';

class ChatPage extends Page {
  constructor(socket) {
    super(socket);
    this.logoutUser = this.logoutUser.bind(this);
  }

  public logoutUser(): void {
    this.socket.sendLogoutRequest(globalState.uniqueId, globalState.username, globalState.password);
    this.socket.userLogined = false;
    globalThis.location.hash = '/login';
  }

  public render(): HTMLElement {
    const chat = div(
      'wrapper',
      section(
        'header',
        article('header-wrapper', span('user', `user: ${globalState.username}`), span('title', 'fun chat')),
        button('header-about btn', 'about', 'button', () => {
          globalThis.location.hash = '/about';
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
        span('footer-rss', 'RSSchool'),
        a('footer-link', 'https://github.com/into0', 'into0'),
        span('footer-year', '2025'),
      ),
    );

    this.container.append(chat.getNode());
    return this.container;
  }
}

export default ChatPage;
