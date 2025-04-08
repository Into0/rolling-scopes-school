import Page from './page';

class Winners extends Page {
  public render(): HTMLElement {
    this.pageTitle.textContent = `winners`;
    this.container.append(this.pageSwitch, this.pageTitle);
    return this.container;
  }
}

export default Winners;
