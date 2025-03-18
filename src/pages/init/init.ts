import Page from '../page';

class Init extends Page {
  protected static textObject = {
    title: 'Decision Making Tool',
  };

  constructor(id: string) {
    super(id);
  }

  public render(): HTMLElement {
    const main = Init.createMain();
    const title = Init.createTitle(Init.textObject.title);

    this.container.append(main.getNode());
    main.append(title);

    return this.container;
  }
}
export default Init;
