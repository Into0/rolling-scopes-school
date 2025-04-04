import Ui from './ui';

abstract class Page {
  protected container: HTMLElement;
  protected pageSwitch: HTMLElement;
  protected pageTitle: HTMLElement;
  constructor(id: string) {
    this.container = Ui.createTag('main', 'main').getNode();
    this.container.id = id;
    this.pageSwitch = Ui.createPageSwitch(
      () => {
        globalThis.location.hash = '/garage';
      },
      () => {
        globalThis.location.hash = '/winners';
      },
    ).getNode();
    this.pageTitle = Ui.createTitle('title').getNode();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
