'use strict';

const response = await fetch('./nonograms.json');
const nonograms = await response.json();

let id;
let nono;
let clue;
let steps;
let name;

let field;
let nonoField;
let clueLeft;
let clueTop;
let wrapper;
let gameName;

let clueArrTop;
let clueArrLeft;

let correct = 0;
let incorrect = 0;

let sound = new Audio();

function genElem(tag, name, attr) {
  tag = document.createElement(tag);
  name = tag.classList.add(name);
  attr = Object.assign(tag, attr);
  return tag;
}

function startGame(id) {
  wrapper = genElem('div', 'wrapper');
  clueLeft = genElem('div', 'clue-left');
  field = genElem('div', 'field');
  clueTop = genElem('div', 'clue-top');
  nonoField = genElem('div', 'nono');
  gameName = genElem('div', 'nono-name');

  nono = nonograms[id].nonogram;
  clue = nonograms[id].clue;
  steps = nonograms[id].steps
  name = nonograms[id].name

  gameName.textContent = name;

  clueArrTop = clue.slice(0, clue.length / 2);
  clueArrLeft = clue.slice(clue.length / 2, clue.length);

  genNono(nono, nonoField, 'row', '', 'click', true);
  genNono(clueArrTop, clueTop, 'row', true);
  genNono(clueArrLeft, clueLeft, 'coll', true);

  document.body.append(wrapper);
  wrapper.append(clueLeft);
  wrapper.append(field);
  field.prepend(clueTop);
  clueTop.prepend(gameName);
  field.append(nonoField);
}

startGame(0);


/*
const rows = (parent, elemClass) => {
  nono.forEach((element) => {
    const row = genElem('div', elemClass);
    parent.append(row);
    const cell = element.map((data) => genElem('div', 'cell', { secret: data }));
    row.append(...cell);
  });
}
rows(nonoField, 'row');
*/


const rows = (parent) => {
  nono.forEach((element) => {
    const row = genElem('div', 'row');
    wrapper.append(row)

  });
}

function genNono(arr, parent, elemClass, text, eventType, menu) {
  arr.forEach((element) => {
    const row = genElem('div', elemClass);
    parent.append(row);
    element.forEach((data) => {
      const cell = genElem('div', 'cell', { secret: data });
      if (text === true && data > 0) cell.textContent = data;
      row.append(cell);
      cell.addEventListener(eventType, (event) => {
        if (event.target.secret && !event.target.classList.contains('color')) { correct += 1; }
        if (event.target.secret && event.target.classList.contains('color')) { correct -= 1; }
        if (!event.target.secret && !event.target.classList.contains('color')) { incorrect += 1; }
        if (!event.target.secret && event.target.classList.contains('color')) { incorrect -= 1; }
        if (correct === steps && !incorrect > 0) {
          nonoField.style.setProperty('pointer-events', 'none');
          showPopup();
        };
        if (event.target.classList.contains('color')) {
          event.target.classList.remove('color');
          playSound('./assets/click.mp3');
        } else {
          event.target.classList.add('color');
          event.target.classList.remove('cross');
          playSound('./assets/click1.mp3');
        }
      });

      if (menu === true) {
        cell.addEventListener('contextmenu', (event) => {
          event.preventDefault();
          playSound('./assets/cross.mp3');
          if (event.target.classList.contains('cross')) {
            event.target.classList.remove('cross');
          } else if (event.target.secret && event.target.classList.contains('color')) {
            event.target.classList.remove('color');
            event.target.classList.add('cross');
            correct -= 1;
          } else if (!event.target.secret && event.target.classList.contains('color')) {
            event.target.classList.remove('color');
            event.target.classList.add('cross');
            incorrect -= 1;
          }
           else {
            event.target.classList.add('cross');
            event.target.classList.remove('color');
          }
        });
      }
    });
  });
}

function genButtons() {
  const btnRandom = genElem('button', 'btn');
  const btnReset = genElem('button', 'btn');
  const btnSolution = genElem('button', 'btn');
  const btns = genElem('div', 'btns');

  btnRandom.textContent = 'random';
  btnReset.textContent = 'reset';
  btnSolution.textContent = 'solution';

  document.body.append(btns);
  btns.append(btnRandom, btnReset, btnSolution);

  btnRandom.addEventListener('click', (event) => {
    randomGame();
  });
   btnReset.addEventListener('click', (event) => {
    resetGame();
  });
   btnSolution.addEventListener('click', (event) => {
    showSolution();
  });

}

genButtons();


function showSolution() {
  Array.from(nonoField.querySelectorAll('.cell')).forEach((element) => {
    element.classList.remove('cross');
    if (element['secret']) {
      element.classList.add('color');
    } else {
      element.classList.remove('color');
    }
  });
  correct = steps;
  incorrect = 0;
  nonoField.style.setProperty('pointer-events', 'none');
}

function resetGame() {
  Array.from(document.querySelectorAll('.cell')).forEach((element) => {
    element.classList.remove('color');
    element.classList.remove('cross');
  });
  nonoField.style.removeProperty('pointer-events', 'none');
  correct = 0;
  incorrect = 0;
}

function randomGame() {
  wrapper.remove();
  startGame(randomId(nonograms));
  resetGame();
}

function randomId(arr) {
  return parseInt(arr.length * Math.random());
}

function showPopup() {
  const overlay = genElem('div', 'overlay');
  const popup = genElem('div', 'popup');
  const text = genElem('span', 'popup__text');

  overlay.classList.add('overlay__show');
  popup.classList.add('popup__show');
  document.documentElement.style.overflow = 'hidden';

  document.body.append(overlay);
  overlay.append(popup);
  popup.append(text);
  text.textContent = 'Great! You have solved the nonogram!';

  overlay.addEventListener('click', (event) => {
    overlay.classList.remove('overlay__show');
    popup.classList.remove('popup__show');
  });

  playSound('./assets/win.mp3');
}


function selectLvl() {
  const select = genElem('div', 'select');
  const lvl = genElem('select', 'select-lvl', { name: 'lvl' });
  const game = genElem('select', 'select-game', { name: 'game' });
  const optionHolder = genElem('option', 'option-holder');

  Array.from(['easy', 'medium', 'hard']).forEach((element) => {
    const lvlOptions = genElem('option', 'lvl-option');
    lvl.append(lvlOptions);
    lvlOptions.textContent = element;
  });

  for (let i = 0; i < nonograms.length; i += 1) {
    const gameOptions = genElem('option', 'game-option');
    if (nonograms[i].lvl === 'easy') {
      game.prepend(optionHolder);
      game.append(gameOptions);
      gameOptions.textContent = nonograms[i].name;
      optionHolder.textContent = 'select...';
    }
  }

  lvl.addEventListener('change', (event) => {
    game.innerHTML = '';
    if (event.target.selectedOptions[0].value === 'easy') {
      for (let i = 0; i < nonograms.length; i += 1) {
        const gameOptions = genElem('option', 'game-option');
        if (nonograms[i].lvl === 'easy') {
          game.prepend(optionHolder);
          game.append(gameOptions);
          gameOptions.textContent = nonograms[i].name;
          optionHolder.textContent = 'select...';
        }
      }
    }

    if (event.target.selectedOptions[0].value === 'medium') {
      const gameOptions = genElem('option', 'game-option');
      for (let i = 0; i < nonograms.length; i += 1) {
        const gameOptions = genElem('option', 'game-option');
        if (nonograms[i].lvl === 'medium') {
          game.prepend(optionHolder);
          game.append(gameOptions);
          gameOptions.textContent = nonograms[i].name;
          optionHolder.textContent = 'select...';
        }
      }
    }

    if (event.target.selectedOptions[0].value === 'hard') {
      for (let i = 0; i < nonograms.length; i += 1) {
        const gameOptions = genElem('option', 'game-option');
        if (nonograms[i].lvl === 'hard') {
          game.prepend(optionHolder);
          game.append(gameOptions);
          gameOptions.textContent = nonograms[i].name;
          optionHolder.textContent = 'select...';
        }
      }
    }
  });

  game.addEventListener('change', (event) => {
    for (let i = 0; i < nonograms.length; i += 1) {
      if (event.target.selectedOptions[0].value === nonograms[i].name) {
        wrapper.remove();
        startGame(i);
      }
    }
  });

  document.body.append(select);
  select.append(lvl);
  select.append(game);
}

selectLvl()

function shangeColor() {
  const btnLight = genElem('button', 'btn');
  const btnDark = genElem('button', 'btn');
  const themeSwitcher = genElem('div', 'theme-switcher');

  btnLight.textContent = 'Light';
  btnDark.textContent = 'Dark';

  btnLight.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--Orange', '#2d2d2d');
    document.documentElement.style.setProperty('--Puter', '#dcdcdc');
    document.documentElement.style.setProperty('--Shadow-Gray', '#C7C7C7');
  });

  btnDark.addEventListener('click', (event) => {
    document.documentElement.style.setProperty('--Orange', '#d64937');
    document.documentElement.style.setProperty('--Puter', '#2d2d2d');
    document.documentElement.style.setProperty('--Shadow-Gray', '#3d3d3d');
  });

  document.body.append(themeSwitcher);
  themeSwitcher.append(btnLight, btnDark);
}

shangeColor()

function playSound(file) {
  sound = new Audio(file);
  sound.play();
}
