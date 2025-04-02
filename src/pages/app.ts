import type Page from './page';
import Garage from './garage';
import Winners from './winners';

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

    if (pageId === '/winners') {
      page = new Winners(pageId);
    } else {
      page = new Garage(pageId);
    }

    if (page) {
      const pageHTML = page.render();
      this.container.append(pageHTML);
    }
  }

  private routeChange(): void {
    globalThis.addEventListener('hashchange', () => {
      let hash = globalThis.location.hash.slice(1);
      if (hash !== '/winners') {
        globalThis.location.hash = '/garage';
      }
      this.renderNewPage(hash);
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
