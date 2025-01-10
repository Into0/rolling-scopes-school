"use strict";

//////////////////////////////

const gameTag = createElement({
  tag: "main",
  text: "",
  classes: ["game"],
});

document.body.append(gameTag);

const gameBtns = createElement({
  tag: "div",
  text: "",
  classes: ["game-btns"],
});

const selectLvl = createElement({
  tag: "select",
  text: "",
  classes: ["select-lvl"],
  att: ["name", "lvl"]
});

const wrapper = createElement({
  tag: "div",
  text: "",
  classes: ["wrapper"],
});

gameTag.append(gameBtns, selectLvl, wrapper);

const btnStart = createElement({
  tag: "button",
  text: "Start",
  classes: ["btn-start", "btn"],
});

const btnRepeat = createElement({
  tag: "button",
  text: "Repeat",
  classes: ["btn-start", "btn", "hide"],
});

const btnNew = createElement({
  tag: "button",
  text: "New",
  classes: ["btn-start", "btn", "hide"],
});

gameBtns.append(btnStart, btnRepeat, btnNew);

const lvlOption = ['easy', 'medium', 'hard'];

lvlOption.forEach((lvl) => {
  const lvlOption1 = createElement({
    tag: "option",
    text: lvl,
    classes: ["lvl-option"],
  });
  selectLvl.append(lvlOption1);
});


const field = createElement({
  tag: "div",
  text: "",
  classes: ["field"],
});

const keyboard = createElement({
  tag: "div",
  text: "",
  classes: ["keyboard"],
});

wrapper.append(field, keyboard);

const keyboardNumbers = createElement({
  tag: "div",
  text: "",
  classes: ["keyboard-numbers"],
});

const keyboardLetters = createElement({
  tag: "div",
  text: "",
  classes: ["keyboard-letters", "hide"],
});

keyboard.append(keyboardNumbers, keyboardLetters);

const lvlEasy = [...'0123456789'];

lvlEasy.forEach((key) => {
  const keyboardBtns = createElement({
    tag: "button",
    text: key,
    classes: ["keyboard__btn", "keyboard__btn-numbers", "btn"],
  });
  keyboardNumbers.append(keyboardBtns);
});

const lvlMedium = [...'abcdefghijklmnopqrstuvwxyz'];

lvlMedium.forEach((key) => {
  const keyboardBtns = createElement({
    tag: "button",
    text: key,
    classes: ["keyboard__btn", "keyboard__btn-letters", "btn"],
  });
  keyboardLetters.append(keyboardBtns);
});

//////////////////////////////

function createElement(options) {
  const { tag = "div", text = "", parent, classes = [], att = [] } = options;

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

function clearChilds(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//////////////////////////////

btnStart.addEventListener('click', () => {

});

selectLvl.addEventListener('change', (event) => {
  if (event.target.selectedOptions[0].value === 'easy') {
    keyboardLetters.classList.add('hide');
    keyboardNumbers.classList.remove('hide');
  }

  if (event.target.selectedOptions[0].value === 'medium') {
    keyboardNumbers.classList.add('hide');
    keyboardLetters.classList.remove('hide');
  }

  if (event.target.selectedOptions[0].value === 'hard') {
    keyboardNumbers.classList.remove('hide');
    keyboardLetters.classList.remove('hide');
  }
});
