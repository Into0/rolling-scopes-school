import Page from './page';
import Ui from './ui';

class Winners extends Page {
  public render(): HTMLElement {
    const pageTitle = Ui.createTitle(this.textObject.winners).getNode();

    this.container.append(this.pageSwitch, pageTitle);
    return this.container;
  }
}

export default Winners;
