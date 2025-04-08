import Tag from '../components/tags';

abstract class Page {
  protected container: HTMLElement;
  protected pageSwitch: HTMLElement;
  protected pageTitle: HTMLElement;
  constructor(id: string) {
    this.container = Tag.main('main').getNode();
    this.container.id = id;
    this.pageSwitch = Tag.div(
      'page-switch',
      Tag.button('btn-garage', 'garage', () => {
        globalThis.location.hash = '/garage';
      }),
      Tag.button('btn-winners', 'winners', () => {
        globalThis.location.hash = '/winners';
      }),
      ).getNode()
    this.pageTitle = Tag.h1('title').getNode();
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
