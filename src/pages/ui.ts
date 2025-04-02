import Component from "../components/components";
import Button from "../components/button";

abstract class Ui {
  
  public static createMain(): Component {
    return new Component({
      tag: 'main',
      className: 'main',
    });
  }

  public static createPageSwitch(): Component {
    return new Component(
      {
        tag: 'div',
        className: 'page-switch',
      },
      new Button({
        className: 'btn-garage',
        text: 'garage',
        onClick: (): void => {
          globalThis.location.hash = '/garage';
        },
      }),
      new Button({
        className: 'btn-winners',
        text: 'winners',
        onClick: (): void => {
          globalThis.location.hash = '/winners';
        },
      }),
      );
    }
    public static createTitle(text?: string): Component {
      return new Component({
        tag: 'h1',
        className: 'title',
        text: text,
      })
    }
}

export default Ui;