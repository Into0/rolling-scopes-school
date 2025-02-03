import 'modern-normalize';

import './style.css';

const response = await fetch('nonograms.json');
const nonograms = await response.json();

function createElement(options) {
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
    element.setAttribute(...att);
  }

  return element;
}

const wrapperTag = createElement({
  tag: 'div',
  text: '',
  classes: ['wrapper'],
});

const btnsTag = createElement({
  tag: 'div',
  text: '',
  classes: ['btns'],
});

const selectTag = createElement({
  tag: 'div',
  text: '',
  classes: ['select'],
});

const themeSwitcherTag = createElement({
  tag: 'div',
  text: '',
  classes: ['theme-switcher'],
});

const soundMuteTag = createElement({
  tag: 'label',
  text: 'mute sound',
  classes: ['sound-mute', 'btn'],
});

document.body.append(
  wrapperTag,
  btnsTag,
  selectTag,
  themeSwitcherTag,
  soundMuteTag,
);

const btnRandomTag = createElement({
  tag: 'button',
  text: 'random',
  classes: ['btn'],
});

const btnResetTag = createElement({
  tag: 'button',
  text: 'reset',
  classes: ['btn'],
});

const btnSolutionTag = createElement({
  tag: 'button',
  text: 'solution',
  classes: ['btn'],
});

btnsTag.append(btnRandomTag, btnResetTag, btnSolutionTag);

const selectLvlTag = createElement({
  tag: 'select',
  text: '',
  classes: ['select-lvl'],
});

const lvlOption = ['easy', 'medium', 'hard'];

lvlOption.forEach(lvl => {
  const element = createElement({
    tag: 'option',
    text: lvl,
    classes: ['lvl-option'],
  });
  selectLvlTag.append(element);
});

const selectGameTag = createElement({
  tag: 'select',
  text: '',
  classes: ['select-game'],
});

nonograms.forEach(game => {
  const element = createElement({
    tag: 'option',
    text: game.name,
    classes: ['lvl-option'],
  });
  selectGameTag.append(element);
});

selectTag.append(selectLvlTag, selectGameTag);

const btnLightTag = createElement({
  tag: 'button',
  text: 'light',
  classes: ['btn'],
});

const btnDarkTag = createElement({
  tag: 'button',
  text: 'dark',
  classes: ['btn'],
});

themeSwitcherTag.append(btnLightTag, btnDarkTag);

const soundInputTag = createElement({
  tag: 'input',
  text: '',
  classes: ['sound'],
  att: ['type', 'checkbox'],
});

soundMuteTag.append(soundInputTag);
