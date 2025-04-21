import { main } from '../components/tags';

class Page {
  public container = main('main').getNode();
  public socket;

  constructor(socket?) {
    this.socket = socket;
  }

  public back(): void {
    history.back();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
