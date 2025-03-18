import type Page from '../page';
import Init from '../init/init';
import Wheel from '../wheel/wheel';
import NotFound from '../not-found/not-found';

class App {
  private static container: HTMLElement = document.body;

  constructor() {}

  private static renderNewPage(pageId: string): void {
    App.container.textContent = '';
    let page: Page | undefined = undefined;

    if (pageId === '') {
      page = new Init(pageId);
    } else if (pageId === 'wheel') {
      page = new Wheel(pageId);
    } else {
      page = new NotFound(pageId);
    }

    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }

  private static routeChange(): void {
    globalThis.addEventListener('hashchange', () => {
      const hash = globalThis.location.hash.slice(2);
      App.renderNewPage(hash);
    });
  }
  private static locationChange(): void {
    globalThis.addEventListener('load', () => {
      const path = globalThis.location.pathname.slice(1);
      history.replaceState(undefined, '', '/#/');
    });
  }

  public run(): void {
    //this.container.append(this.listPage.render())
    App.locationChange();
    App.routeChange();
    App.renderNewPage('');
  }
}

export default App;
