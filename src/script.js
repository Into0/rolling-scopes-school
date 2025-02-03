import 'modern-normalize';

import './style.css';

const response = await fetch('nonograms.json');
const nonograms = await response.json();

/// ///////////////////////////

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

const overlayTag = createElement({
  tag: 'div',
  text: '',
  classes: ['overlay'],
});

const modalTag = createElement({
  tag: 'div',
  text: 'Great! You have solved the nonogram!',
  classes: ['modal'],
});

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
  overlayTag,
  modalTag,
  wrapperTag,
  btnsTag,
  selectTag,
  themeSwitcherTag,
  soundMuteTag,
);

const fieldTag = createElement({
  tag: 'div',
  text: '',
  classes: ['field'],
});

wrapperTag.append(fieldTag);

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

/// ///////////////////////////

function showModal() {
  overlayTag.classList.add('overlay-show');
  modalTag.classList.add('modal-show');

  overlayTag.addEventListener('click', () => {
    overlayTag.classList.remove('overlay-show');
    modalTag.classList.remove('modal-show');
  });
}

function genNono(arr, id = 0) {
  let correct = 0;
  let incorrect = 0;

  arr[id].nonogram.forEach(element => {
    const rowTag = createElement({
      tag: 'div',
      text: '',
      classes: ['row'],
    });
    fieldTag.append(rowTag);

    element.forEach(data => {
      const cellTag = createElement({
        tag: 'div',
        text: `${data}`,
        classes: ['cell'],
      });

      Object.assign(cellTag, { secret: data });
      rowTag.append(cellTag);

      cellTag.addEventListener('click', event => {
        const cell = event.target;

        cell.classList.toggle('cell-color');
        if (cell.secret && cell.classList.contains('cell-color')) {
          correct += 1;
        }
        if (cell.secret && !cell.classList.contains('cell-color')) {
          correct -= 1;
        }
        if (!cell.secret && cell.classList.contains('cell-color')) {
          incorrect -= 1;
        }
        if (!cell.secret && !cell.classList.contains('cell-color')) {
          incorrect += 1;
        }
        if (correct === arr[id].steps && incorrect === 0) {
          fieldTag.style.setProperty('pointer-events', 'none');
          showModal();
        }
      });

      cellTag.addEventListener('contextmenu', event => {
        const cell = event.target;
        event.preventDefault();
        cell.classList.toggle('cell-cross');
      });
    });
  });
}

genNono(nonograms, 0);

/// ///////////////////////////

btnLightTag.addEventListener('click', () => {
  document.documentElement.style.setProperty('--Orange', '#2d2d2d');
  document.documentElement.style.setProperty('--Puter', '#dcdcdc');
  document.documentElement.style.setProperty('--Shadow-Gray', '#C7C7C7');
  document.documentElement.style.setProperty('--Davy-Grey', '#848484');
});

btnDarkTag.addEventListener('click', () => {
  document.documentElement.style.setProperty('--Orange', '#d64937');
  document.documentElement.style.setProperty('--Puter', '#2d2d2d');
  document.documentElement.style.setProperty('--Shadow-Gray', '#3d3d3d');
  document.documentElement.style.setProperty('--Davy-Grey', '#535353');
});
