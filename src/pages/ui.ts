import Component from '../components/components';
import Button from '../components/button';
import Input from '../components/input';

abstract class Ui {
  public static createTag(tag: string, className: string): Component {
    return new Component({ tag, className });
  }

  public static createDiv(className: string): Component {
    return new Component({ tag: 'div', className });
  }

  public static createButton(className: string, text: string, onClick?: (event: Event) => void): Component {
    return new Button({ className, text, onClick });
  }

  public static createInput(className: string, type: string, onChange?: (event: Event) => void): Component {
    return new Input({ className, type, onChange });
  }

  public static createSpan(className: string, text?: string): Component {
    return new Component({ tag: 'span', className, text });
  }

  public static createTitle(className: string, text?: string): Component {
    return new Component({ tag: 'h1', className, text });
  }

  public static createPageSwitch(
    onClickGarage: (event: Event) => void,
    onClickWinners: (event: Event) => void,
  ): Component {
    return new Component(
      {
        tag: 'div',
        className: 'page-switch',
      },
      this.createButton('btn-garage', 'garage', onClickGarage),
      this.createButton('btn-winners', 'winners', onClickWinners),
    );
  }

  public static createCar(
    onInput: (event: Event) => void,
    onChangeColor: (event: Event) => void,
    onClikCreate: (event: Event) => void,
  ): Component {
    return new Component(
      {
        tag: 'div',
        className: 'create-car',
      },
      this.createInput('car-name-input', 'text', onInput),
      this.createInput('car-color-input', 'color', onChangeColor),
      this.createButton('btn-create', 'create', onClikCreate),
    );
  }
}

export default Ui;
