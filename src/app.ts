import AboutPage from './pages/about/about';
import ChatPage from './pages/chat/chat';
import LoginPage from './pages/login/login';
import type Page from './pages/page';
import Socket from './utils/socket';

class App {
  private container = document.body;
  private socket: Socket;

  constructor() {
    this.socket = new Socket('');
  }

  public run(): void {
    this.locationChange();
    this.routeChange();
  }

  private renderPage(pageId: string): void {
    this.container.replaceChildren();
    let page: Page | undefined = undefined;
    const login = new LoginPage(this.socket);
    const about = new AboutPage();
    const chat = new ChatPage(this.socket);

    switch (pageId) {
      case '/login': {
        if (this.socket.userLogined) {
          page = chat;
          globalThis.location.hash = '/chat';
        } else {
          page = login;
        }
        break;
      }
      case '/about': {
        page = about;
        break;
      }
      case '/chat': {
        if (this.socket.userLogined) {
          page = chat;
        } else {
          page = login;
          globalThis.location.hash = '/login';
        }
        break;
      }
      default: {
        page = login;
        break;
      }
    }

    if (page) {
      this.container.append(page.render());
    }
  }

  private routeChange(): void {
    globalThis.addEventListener('hashchange', () => {
      let hash = globalThis.location.hash.slice(1);
      if (hash === '' || hash === '/') {
        globalThis.location.hash = '/login';
      }
      this.renderPage(hash);
    });
  }

  private locationChange(): this {
    globalThis.addEventListener('load', () => {
      if (globalThis.location.pathname.length > 0) {
        globalThis.location.hash = '#/';
      }
      history.replaceState(undefined, '', `${globalThis.location.href}`);
    });
    return this;
  }
}

export default App;
