import Component from '../components/component';

abstract class Page {
  protected static textObject = {};
  protected container: HTMLElement;

  constructor(id: string) {
    this.container = document.body;
    this.container.id = id;
  }

  protected static createMain(): Component {
    return new Component({
      tag: 'main',
      className: 'main',
    });
  }
  protected static createTitle(text: string): Component {
    return new Component({
      tag: 'h1',
      className: 'title',
      text: text,
    });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
export default Page;
