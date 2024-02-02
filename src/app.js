'use strict';

const response = await fetch('./nonograms.json');
const nonograms = await response.json();
let id;
let nono;
let clue;
let steps;

let field;
let nonoField;
let clueLeft;
let clueTop;
let wrapper;

let clueArrTop;
let clueArrLeft;

let correct = 0;
let incorrect = 0;

const random = (key) => {
  let keys = Object.keys(key);
  return key[parseInt(keys.length * Math.random(), 0)];
};

function genElem(tag, name, attr) {
  tag = document.createElement(tag);
  name = tag.classList.add(name);
  attr = Object.assign(tag, attr);
  return tag;
}

function appendElem(parent, child, name, attr) {
  child = genElem(child, name, attr);
  return parent.append(child);
}

function startGame(id) {
  wrapper = genElem('div', 'wrapper');
  clueLeft = genElem('div', 'clue-left');
  field = genElem('div', 'field');
  clueTop = genElem('div', 'clue-top');
  nonoField = genElem('div', 'nono');

  id = randomId(nonograms);
  nono = nonograms[id].nonogram;
  clue = nonograms[id].clue;
  steps = nonograms[id].steps

  clueArrTop = clue.slice(0, clue.length / 2);
  clueArrLeft = clue.slice(clue.length / 2, clue.length);

  genNono(nono, nonoField, 'row', 'click');
  genNono(clueArrTop, clueTop, 'row', '', true);
  genNono(clueArrLeft, clueLeft, 'coll', '', true);

  document.body.append(wrapper);
  wrapper.append(clueLeft);
  wrapper.append(field);
  field.prepend(clueTop);
  field.append(nonoField);
}

startGame()


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

function genNono(arr, parent, elemClass, eventType, text) {
  arr.forEach((element) => {
    const row = genElem('div', elemClass);
    parent.append(row);
    element.forEach((data) => {
      const cell = genElem('div', 'cell', { secret: data });
      if (text == true && data > 0) cell.textContent = data;
      row.append(cell);
      cell.addEventListener(eventType, function abc(event)  {
      if (event.target.secret && !event.target.classList.contains('color')) { correct += 1; }
      if (event.target.secret && event.target.classList.contains('color')) { correct -= 1; }
      if (!event.target.secret && !event.target.classList.contains('color')) { incorrect += 1; }
      if (!event.target.secret && event.target.classList.contains('color')) { incorrect -= 1; }
      if (correct === steps && incorrect === 0) {
        alert('Great! You have solved the nonogram!');
        nonoField.style.setProperty('pointer-events', 'none');
      };
      event.target.classList.contains('color') ? event.target.classList.remove('color') : event.target.classList.add('color');
    });
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
  });
  nonoField.style.removeProperty('pointer-events', 'none');
  correct = 0;
  incorrect = 0;
}

function randomGame() {
  wrapper.remove();
  startGame();
  resetGame()
}

function randomId(arr) {
  return parseInt(arr.length * Math.random());
}



/*

const genNono = nono.forEach((element) => {
  const row = document.createElement('div');
  row.classList.add('row');
  document.body.append(row);
  element.forEach((data) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    Object.assign(cell, { secret: data });
    row.append(cell);
    cell.innerText = data;
    cell.addEventListener('click', (event) => {
      event.target.secret ? console.log('true') : console.log('false');
      event.target.classList.contains('color') ? event.target.classList.remove('color') : event.target.classList.add('color');
    });
    cell.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });
  });
});

nonoHint.forEach((element) => {

  const row = document.createElement('div');
  row.classList.add('row');
  document.body.append(row);
  let hintRow = nonoHint.length / 2;
  const col = document.createElement('div');
    col.classList.add('row');


  element.forEach((data) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    row.append(cell);
    row.append(col);
    cell.innerText = data;
  });
});

*/
