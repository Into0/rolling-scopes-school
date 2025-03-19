import Component from '../components/component';
import Button from '../components/button';

abstract class Page {
  protected static textObject = {};
  protected container: HTMLElement;

  constructor(id: string) {
    this.container = Page.createMain().getNode();
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

  protected static createBackButton(text: string): Component {
    return new Button({
      className: 'btn-back',
      text: text,
      onClick: (): void => {
        globalThis.location.hash = '/';
      },
    });
  }

  public render(): HTMLElement {
    return this.container;
  }
}
export default Page;
