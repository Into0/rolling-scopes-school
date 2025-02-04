import 'modern-normalize';

import './style.css';

const response = await fetch('nonograms.json');
const nonograms = await response.json();

/// ELEMENTS ///////////////////////////
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

const clueLeftTag = createElement({
  tag: 'div',
  text: '',
  classes: ['clue-left'],
});

const nonoTag = createElement({
  tag: 'div',
  text: '',
  classes: ['nono'],
});

wrapperTag.append(clueLeftTag, nonoTag);

const clueTopTag = createElement({
  tag: 'div',
  text: '',
  classes: ['clue-top'],
});

const fieldTag = createElement({
  tag: 'div',
  text: '',
  classes: ['field'],
});

nonoTag.append(clueTopTag, fieldTag);

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

/// FUNCTIONS ///////////////////////////
/// ///////////////////////////

function showModal() {
  overlayTag.classList.add('overlay-show');
  modalTag.classList.add('modal-show');

  overlayTag.addEventListener('click', () => {
    overlayTag.classList.remove('overlay-show');
    modalTag.classList.remove('modal-show');
  });
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function genNono(arr, id = 0) {
  let correct = 0;
  let incorrect = 0;
  fieldTag.style.setProperty('pointer-events', 'auto');

  const { clue } = arr[id];
  const clueTop = clue.slice(0, clue.length / 2);
  const clueLeft = clue.slice(clue.length / 2, clue.length);

  const clueName = createElement({
    tag: 'div',
    text: `${arr[id].name}`,
    classes: ['nono-name'],
  });
  clueTopTag.append(clueName);

  clueTop.forEach(element => {
    const clueRow = createElement({
      tag: 'div',
      text: '',
      classes: ['row'],
    });
    clueTopTag.append(clueRow);

    element.forEach(data => {
      const cellTag = createElement({
        tag: 'div',
        text: `${data}`,
        classes: ['cell'],
      });
      clueRow.append(cellTag);
    });
  });
  clueLeft.forEach(element => {
    const clueColl = createElement({
      tag: 'div',
      text: '',
      classes: ['coll'],
    });
    clueLeftTag.append(clueColl);

    element.forEach(data => {
      const cellTag = createElement({
        tag: 'div',
        text: `${data}`,
        classes: ['cell'],
      });
      clueColl.append(cellTag);
    });
  });

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
        text: '',
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

function clearChilds(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function changeLvl(start, end) {
  for (let i = start; i < end; i += 1) {
    const lvl = createElement({
      tag: 'option',
      text: nonograms[i].name,
      classes: ['game-option'],
    });
    Object.assign(lvl, { gameIndex: i });
    selectGameTag.append(lvl);
  }
}
changeLvl(0, 5);

/// EVENTS ///////////////////////////
/// ///////////////////////////

selectLvlTag.addEventListener('change', event => {
  clearChilds(selectGameTag);
  if (event.target.selectedOptions[0].value === 'easy') {
    changeLvl(0, 5);
    clearChilds(fieldTag);
    clearChilds(clueLeftTag);
    clearChilds(clueTopTag);
    genNono(nonograms, 0);
  }
  if (event.target.selectedOptions[0].value === 'medium') {
    changeLvl(5, 10);
    clearChilds(fieldTag);
    clearChilds(clueLeftTag);
    clearChilds(clueTopTag);
    genNono(nonograms, 5);
  }
  if (event.target.selectedOptions[0].value === 'hard') {
    changeLvl(10, 15);
    clearChilds(fieldTag);
    clearChilds(clueLeftTag);
    clearChilds(clueTopTag);
    genNono(nonograms, 10);
  }
});

selectGameTag.addEventListener('change', event => {
  clearChilds(fieldTag);
  clearChilds(clueLeftTag);
  clearChilds(clueTopTag);
  genNono(nonograms, event.target.selectedOptions[0].gameIndex);
});

btnRandomTag.addEventListener('click', () => {
  clearChilds(fieldTag);
  clearChilds(clueLeftTag);
  clearChilds(clueTopTag);
  genNono(nonograms, getRandomNum(0, 15));
});

btnResetTag.addEventListener('click', () => {
  clearChilds(fieldTag);
  clearChilds(clueLeftTag);
  clearChilds(clueTopTag);
  genNono(nonograms, selectGameTag.selectedOptions[0].gameIndex);
});

btnSolutionTag.addEventListener('click', () => {
  fieldTag.style.setProperty('pointer-events', 'none');
  fieldTag.querySelectorAll('.cell').forEach(element => {
    element.classList.remove('cell-cross');
    if (element.secret) {
      element.classList.add('cell-color');
    } else {
      element.classList.remove('cell-color');
    }
  });
});

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
