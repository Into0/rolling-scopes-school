import Page from '../page';

class NotFound extends Page {
  protected static textObject = {
    title: 'Something went wrong',
  };

  constructor(id: string) {
    super(id);
  }

  public render(): HTMLElement {
    const title = NotFound.createTitle(NotFound.textObject.title);
    this.container.append(title.getNode());
    return this.container;
  }
}
export default NotFound;
