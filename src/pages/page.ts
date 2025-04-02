import Ui from './ui';

abstract class Page {
  protected container: HTMLElement;
  protected pageSwitch: HTMLElement;
  protected textObject = {
    garage: 'garage',
    winners: 'winners',
  };

  constructor(id: string) {
    this.container = Ui.createMain().getNode();
    this.container.id = id;

    this.pageSwitch = Ui.createPageSwitch().getNode();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
