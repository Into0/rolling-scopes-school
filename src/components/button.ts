import Component from './component';

interface ButtonOptions {
  className: string;
  text?: string;
  type: string;
  onClick?: (event: Event) => void;
}

class ButtonComponent extends Component {
  private onClick;

  constructor({ className, text, type, onClick }: ButtonOptions) {
    super({ tag: 'button', className, text });
    if (type) {
      this.setAttribute('type', type);
    }

    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', this.onClick);
    }
  }

  public destroy(): void {
    if (this.onClick) {
      this.removeListener('click', this.onClick);
    }
    super.destroy();
  }
}

export default ButtonComponent;
