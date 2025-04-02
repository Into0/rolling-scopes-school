import Page from './page';
import Ui from './ui';

class Garage extends Page {
  public render(): HTMLElement {
    const pageTitle = Ui.createTitle(this.textObject.garage).getNode();

    this.container.append(this.pageSwitch, pageTitle);
    return this.container;
  }
}

export default Garage;
