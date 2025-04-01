import Component from '../components/components';

abstract class Page {
  protected container: HTMLElement;

  constructor(id: string) {
    this.container = this.createMain().getNode();
    this.container.id = id;
  }

  public render(): HTMLElement {
    return this.container;
  }

  protected createMain(): Component {
    return new Component({
      tag: 'main',
      className: 'main',
    });
  }
}

export default Page;
