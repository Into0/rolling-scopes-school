import Page from '../page';

class NotFound extends Page {
  protected static textObject = {
    title: 'Something went wrong',
    btnBack: 'Back',
  };

  constructor(id: string) {
    super(id);
  }

  public render(): HTMLElement {
    const title = NotFound.createTitle(NotFound.textObject.title);
    const buttonBack = NotFound.createBackButton(NotFound.textObject.btnBack);

    this.container.append(title.getNode(), buttonBack.getNode());
    return this.container;
  }
}
export default NotFound;
