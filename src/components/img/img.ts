import './img.css';
import Component from '../component';

interface ImgOptions {
  className: string;
  source: string;
  text?: string;
}

class ImgComponent extends Component {
  constructor({ className, source, text }: ImgOptions) {
    super({ tag: 'img', className, text });
    this.setAttribute('src', source);
  }

  public destroy(): void {
    super.destroy();
  }
}

export default ImgComponent;
