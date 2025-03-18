import Page from '../page.ts';

class Wheel extends Page {
  protected static textObject = {
    title: 'Decision Making Tool',
  };

  constructor(id: string) {
    super(id);
  }

  public render(): HTMLElement {
    const main = Wheel.createMain();
    const title = Wheel.createTitle(Wheel.textObject.title);

    this.container.append(main.getNode());
    main.append(title);

    return this.container;
  }
}
export default Wheel;
