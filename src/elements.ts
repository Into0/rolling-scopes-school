import type { createElement_ } from './types/index';

function createElement(options: createElement_): HTMLElement {
  const { tag = 'div', text = '', parent, classes = [], att = [] } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (parent != undefined) {
    parent.append(element);
  }

  if (att.length > 0) {
    for (const [name, value] of att) {
      element.setAttribute(name, value);
    }
  }

  return element;
}

const mainElement = createElement({
  tag: 'main',
  classes: ['main'],
});

document.body.append(mainElement);
