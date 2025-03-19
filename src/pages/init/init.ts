import Page from '../page';
import Component from '../../components/component';
import Button from '../../components/button';
import Input from '../../components/input';
import { Label } from '../../components/input';

class Init extends Page {
  protected static textObject = {
    title: 'Decision Making Tool',
  };

  constructor(id: string) {
    super(id);
  }

  protected static createList(): Component {
    return new Component({
      tag: 'ul',
      className: 'list',
    });
  }

  protected static createListItem(): Component {
    return new Component(
      {
        tag: 'li',
        className: 'list-item',
      },
      new Label({
        className: 'list-item',
        labelFor: 'option-#1',
      }),
      new Input({
        className: 'input',
        type: '',
        placeholder: 'Title',
        name: 'title',
      }),
      new Input({
        className: 'input',
        type: 'number',
        placeholder: 'Weight',
        name: 'weight',
      }),
      new Component({
        tag: 'button',
        className: 'list-item',
        text: 'Delete',
      }),
    );
  }

  protected static createListButtons(): Component {
    return new Component(
      {
        className: 'list-buttons',
      },
      new Button({
        className: 'btn-add',
        text: 'Add option',
        onClick: (): void => {},
      }),
      new Button({
        className: 'btn-paste',
        text: 'Paste list',
        onClick: (): void => {},
      }),
      new Button({
        className: 'btn-clear',
        text: 'Clear list',
        onClick: (): void => {},
      }),
      new Button({
        className: 'btn-save',
        text: 'Save list to file',
        onClick: (): void => {},
      }),
      new Button({
        className: 'btn-load',
        text: 'Load list from file',
        onClick: (): void => {},
      }),
      new Button({
        className: 'btn-start',
        text: 'Start',
        onClick: (): void => {
          globalThis.location.hash = '/wheel';
        },
      }),
    );
  }
  public render(): HTMLElement {
    const title = Init.createTitle(Init.textObject.title);
    const list = Init.createList();
    const listItem = Init.createListItem();
    const buttons = Init.createListButtons();

    this.container.append(buttons.getNode(), title.getNode(), list.getNode(), buttons.getNode());
    list.append(listItem);
    return this.container;
  }
}
export default Init;
