import './about.css';
import { a, button, div, h3, label } from '../../components/tags';
import Page from '../page';

class AboutPage extends Page {
  public render(): HTMLElement {
    const aboutInfo = div(
      '',
      h3('title', 'fun chat'),
      label(''),
      label(''),
      a('', '', ''),
      button('back-btn btn', 'back', 'button', this.back),
    );

    this.container.append(aboutInfo.getNode());
    return this.container;
  }
}

export default AboutPage;
