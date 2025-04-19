import { main } from '../components/tags';
import Socket from '../socket/socket';

class Page {
  public container = main('main').getNode();
  public socket: Socket;

  constructor() {
    this.socket = new Socket();
  }

  public back(): void {
    history.back();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
