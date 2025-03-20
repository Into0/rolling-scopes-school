import type Page from '../page';
import Init from '../init/init';
import Wheel from '../wheel/wheel';
import NotFound from '../not-found/not-found';

class App {
  private container: HTMLElement = document.body;

  constructor() {}

  public run(): void {
    this.locationChange();
    this.routeChange();
    this.renderNewPage('/');
  }

  private renderNewPage(pageId: string): void {
    this.container.replaceChildren();
    let page: Page | undefined = undefined;

    if (pageId === '/') {
      page = new Init(pageId);
    } else if (pageId === '/wheel') {
      page = new Wheel(pageId);
    } else {
      page = new NotFound(pageId);
    }

    if (page) {
      const pageHTML = page.render();
      this.container.append(pageHTML);
    }
  }

  private routeChange(): void {
    globalThis.addEventListener('hashchange', () => {
      let hash = globalThis.location.hash.slice(1);
      if (hash === '') {
        window.location.hash = '/'
      }
      this.renderNewPage(hash);
    });
  }
  private locationChange(): this {
    globalThis.addEventListener('load', () => {
      history.replaceState(undefined, '', `${window.location.origin}#/`);
    });
    return this;
  }
}

export default App;
