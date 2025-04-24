import './about.css';
import { a, button, div, h3, label } from '../../components/elements/tags';
import Page from '../page';

class AboutPage extends Page {
  public render(): HTMLElement {
    const aboutInfo = div(
      'about',
      h3('title', 'Fun Chat'),
      label('The application is designed to demonstrate the Fun Chat task as part of the RSSchool course'),
      a('footer-link', 'https://github.com/into0', 'github.com/into0'),
      a('footer-link', 'https://rs.school/', 'RSSchool'),
      button('about-btn back-btn btn', 'back', 'button', this.back),
    );

    this.container.append(aboutInfo.getNode());
    return this.container;
  }
}

export default AboutPage;
