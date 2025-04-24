import './input.css';
import Component from '../../component';

interface InputOptions {
  className?: string;
  type: string;
  placeholder: string;
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
}

class InputComponent extends Component {
  private onChange?: (event: Event) => void;
  private onInput?: (event: Event) => void;
  constructor({ className, type, placeholder, onChange, onInput }: InputOptions) {
    super({ tag: 'input', className });
    this.setAttribute('type', type);

    if (placeholder) {
      this.setAttribute('placeholder', placeholder);
    }
    if (onChange) {
      this.onChange = onChange;
      this.addListener('change', this.onChange);
    }
    if (onInput) {
      this.onInput = onInput;
      this.addListener('input', this.onInput);
    }
  }
  public destroy(): void {
    super.destroy();
  }
}

export default InputComponent;
