import { main } from '../components/elements/tags';
import type Socket from '../utils/socket';

class Page {
  public container = main('main').getNode();
  public socket;

  public loginPage = '/login';
  public aboutPage = '/about';
  public chatPage = '/chat';

  constructor(socket?: Socket) {
    this.socket = socket;
  }

  public changeRoute(route: string): void {
    globalThis.location.hash = route;
  }

  public back(): void {
    history.back();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
