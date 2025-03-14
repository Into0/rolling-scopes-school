import { createElement_ } from './types/index';

function createElement(options:createElement_): HTMLElement {
  const { tag = 'div', text = '', parent, classes = [], att = [] } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length > 0) {
    element.classList.add(...classes);
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  if (att.length > 0) {
    att.forEach(([name, value]) => {
      element.setAttribute(name, value);
    });
  }

  return element;
}

const mainElement = createElement({
  tag: 'main',
  text: '',
  classes: ['main'],
});

document.body.append(
  mainElement
);