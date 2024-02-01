'use strict';

const response = await fetch('./nonograms.json');
const nonograms = await response.json();
const id = 0;
const nono = nonograms[id].nonogram;
const clue = nonograms[id].clue;

const nonoField = genElem('div', 'nono');
const clueLeft = genElem('div', 'clue-left');
const clueTop = genElem('div', 'clue-top');
const wrapper = genElem('div', 'wrapper');

const clueArrTop = clue.slice(0, clue.length / 2);
const clueArrLeft = clue.slice(clue.length / 2, clue.length);

let correct = 0;

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

function genNono(arr, parent, elemClass, eventType) {
  arr.forEach((element) => {
    const row = genElem('div', elemClass);
    parent.append(row);
    element.forEach((data) => {
      const cell = genElem('div', 'cell', { secret: data });
      if (data > 0) cell.textContent = data;
      row.append(cell);
      cell.addEventListener(eventType, (event) => {
      if (event.target.secret && !event.target.classList.contains('color')) { correct += 1; }
      if (event.target.secret && event.target.classList.contains('color')) { correct -= 1; }
      if (correct === nonograms[id].steps) { alert('yy win'); };
      event.target.classList.contains('color') ? event.target.classList.remove('color') : event.target.classList.add('color');
    });
    });
  });
}

function genButtons() {

}


genNono(nono, nonoField, 'row', 'click');
genNono(clueArrTop, clueTop, 'row');
genNono(clueArrLeft, clueLeft, 'coll');

document.body.append(wrapper);
wrapper.append(clueLeft);
nonoField.prepend(clueTop);
wrapper.append(nonoField);




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
