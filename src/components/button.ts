import Component from "./components";

interface ButtonOptions {
  className?: string;
  text?: string;
  onClick?: (event: Event) => void;
}

class Button extends Component {
  private onClick?: (event: Event) => void;
  constructor({ className, text, onClick }: ButtonOptions) {
    super({ tag: 'button', className, text });
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

export default Button;