import Component from './component';
import type { InputOptions } from '../types';
import type { LabelOptions } from '../types';
class Input extends Component {
  constructor({ className, type, placeholder = '', name = '' }: InputOptions) {
    super({ tag: 'input', className });
    this.setAttribute('type', type);
    this.setAttribute('placeholder', placeholder);
    this.setAttribute('name', name);
  }
  public destroy(): void {
    super.destroy();
  }
}

export class Label extends Component {
  constructor({ className, text, labelFor }: LabelOptions) {
    super({ tag: 'label', className, text });
    if (labelFor) {
      this.setAttribute('for', labelFor);
    }
  }
  public destroy(): void {
    super.destroy();
  }
}

export default Input;
