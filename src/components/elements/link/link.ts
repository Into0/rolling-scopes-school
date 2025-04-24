import './link.css';
import Component from '../../component';

interface LinkOptions {
  className: string;
  text?: string;
  href: string;
}

class LinkComponent extends Component {
  constructor({ className, href, text }: LinkOptions) {
    super({ tag: 'a', className, text });
    this.setAttribute('href', href);
  }

  public destroy(): void {
    super.destroy();
  }
}

export default LinkComponent;
