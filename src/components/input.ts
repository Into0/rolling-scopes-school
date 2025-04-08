import Component from './components';

interface InputOptions {
  className?: string;
  type: string;
  value?: string;
  onChange?: (event: Event) => void;
  onInput?: (event: Event) => void;
}

class Input extends Component {
  private onChange?: (event: Event) => void;
  private onInput?: (event: Event) => void;
  constructor({ className, type, value = '', onChange, onInput }: InputOptions) {
    super({ tag: 'input', className });
    this.setAttribute('type', type);
    this.setAttribute('value', value);
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

export default Input;
