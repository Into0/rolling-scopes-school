import Component from '../../components/component.ts';
import Page from '../page.ts';

class Wheel extends Page {
  protected static textObject = {
    title: 'Decision Making Tool',
    btnBack: 'Back',
    paragraph: 'PRESS START BUTTON',
  };

  constructor(id: string) {
    super(id);
  }

  protected static createParagraph(text: string): Component {
    return new Component({
      className: 'picked-option',
      text: text,
    });
  }

  public render(): HTMLElement {
    const title = Wheel.createTitle(Wheel.textObject.title);
    const buttonBack = Wheel.createBackButton(Wheel.textObject.btnBack);
    const paragraph = Wheel.createParagraph(Wheel.textObject.paragraph);

    this.container.append(title.getNode(), buttonBack.getNode(), paragraph.getNode());
    return this.container;
  }
}
export default Wheel;
