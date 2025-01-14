//////////////////////////////

let round = 1;
let roundLength = round * 2;
let clickCount = 0;
let incorrect = 0;

let lvlKeyIndex = [];
let lvlKeyValue = [];

//////////////////////////////

const gameTag = createElement({
  tag: "main",
  text: "",
  classes: ["game"],
});

document.body.append(gameTag);

const overlay = createElement({
  tag: "div",
  text: "",
  classes: ["overlay"],
});

const modal = createElement({
  tag: "div",
  text: "",
  classes: ["modal"],
});

overlay.append(modal);

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

const roundsCounter = createElement({
  tag: "div",
  text: `Round: ${round}`,
  classes: ["rounds-counter", "hide"],
});

const wrapper = createElement({
  tag: "div",
  text: "",
  classes: ["wrapper"],
});

gameTag.append(overlay, gameBtns, selectLvl, roundsCounter, wrapper);

const btnStart = createElement({
  tag: "button",
  text: "Start",
  classes: ["btn-start", "btn"],
});

const btnNext = createElement({
  tag: "button",
  text: "Next",
  classes: ["btn-next", "btn", "hide"],
});

const btnRepeat = createElement({
  tag: "button",
  text: "Repeat",
  classes: ["btn-repeat", "btn", "hide"],
});

const btnNew = createElement({
  tag: "button",
  text: "New",
  classes: ["btn-new", "btn", "hide"],
});

gameBtns.append(btnStart, btnNext, btnRepeat, btnNew);

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
  classes: ["keyboard", "disable-all"],
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
    att: ["type", "button"]
  });
  keyboardBtns.addEventListener('click', (event) => {
    field.textContent += event.target.textContent
    clickCount += 1;
    if (clickCount === round * 2) {
      keyboard.classList.add('disable-all');
    }
   getCorrect()
  });
  keyboardNumbers.append(keyboardBtns);
});

const lvlMedium = [...'abcdefghijklmnopqrstuvwxyz'];

lvlMedium.forEach((key) => {
  const keyboardBtns = createElement({
    tag: "button",
    text: key,
    classes: ["keyboard__btn", "keyboard__btn-letters", "btn"],
    att: ["type", "button"]
  });
  keyboardBtns.addEventListener('click', () => {
    field.textContent += event.target.textContent
    clickCount += 1;
    if (clickCount === round * 2) {
      keyboard.classList.add('disable-all');
    }
   getCorrect()
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

function classToggle(element, name) {
  return element.classList.toggle(`${name}`);
}

function clearChilds(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function random(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function startGame() {
  clickCount = 0;
  lvlKeyIndex = [];
  lvlKeyValue = [];

  classToggle(btnStart, 'hide');
  classToggle(btnRepeat, 'hide');
  classToggle(btnNew, 'hide');
  selectLvl.setAttribute('disabled', '');
  classToggle(roundsCounter, 'hide');

  roundsCounter.textContent = `Round: ${round}`;

  startRound(`${selectLvl.selectedOptions[0].value}`)
}

async function startRound(lvl) {
  clickCount = 0;
  lvlKeyIndex = [];
  lvlKeyValue = [];
  classToggle(gameBtns, 'disable-all');
  const keyboardBtns = document.querySelectorAll('.keyboard__btn');

  for (let i = 0; i < round * 2; i += 1) {
    let item = 0;
    if (lvl === 'easy') item = getRandomNum(0, 9);
    if (lvl === 'medium') item = getRandomNum(10, 36);
    if (lvl === 'hard') item = getRandomNum(0, 36);

    lvlKeyIndex.push(item);
    lvlKeyValue.push(keyboardBtns[item].textContent);

    classToggle(keyboardBtns[item], 'highlight')
    await delay(1000);
    classToggle(keyboardBtns[item], 'highlight')
  }
    console.log(lvlKeyValue);
    classToggle(keyboard, 'disable-all');
    classToggle(gameBtns, 'disable-all');
}

async function repeatRound() {
  field.textContent = '';
  clickCount = 0;
  correctCount = 0;
  keyboard.classList.add('disable-all');
  classToggle(gameBtns, 'disable-all');
  const keyboardBtns = document.querySelectorAll('.keyboard__btn');

  for (let i = 0; i < round * 2; i += 1) {
    classToggle(keyboardBtns[lvlKeyIndex[i]], 'highlight')
    await delay(1000);
    classToggle(keyboardBtns[lvlKeyIndex[i]], 'highlight')
  }
 keyboard.classList.remove('disable-all');
  classToggle(gameBtns, 'disable-all');
}

let correctCount = 0;
function getCorrect() {
  if (lvlKeyValue[correctCount] !== event.target.textContent) {
    modal.textContent = 'You Lose';
    showModal();
    correctCount = 0;
  }

  correctCount += 1;

  if (correctCount === lvlKeyValue.length) {
    modal.textContent = 'You Win';
    showModal();
    correctCount = 0;
    btnRepeat.classList.add('hide');
    btnNext.classList.remove('hide');
    round += 1;
  }
}

async function showModal(text) {
  keyboard.classList.add('disable-all');
  classToggle(overlay, 'overlay-show');
  classToggle(modal, 'modal-show');
  await delay(2000);
  classToggle(overlay, 'overlay-show');
  classToggle(modal, 'modal-show');
  if (round > 5) {
    btnNext.classList.add('hide');
  }
}

function nextRound() {
  startRound(`${selectLvl.selectedOptions[0].value}`);
  btnNext.classList.add('hide');
  btnRepeat.removeAttribute('disabled');
  btnRepeat.classList.remove('hide');
  roundsCounter.textContent = `Round: ${round}`;
  field.textContent = '';
}



//////////////////////////////

btnStart.addEventListener('click', () => {
  startGame()
});

btnNext.addEventListener('click', () => {
  nextRound()
})

btnRepeat.addEventListener('click', () => {
  repeatRound();
  btnRepeat.setAttribute('disabled', '');
});

btnNew.addEventListener('click', () => {
  classToggle(btnStart, 'hide');
  btnNext.classList.add('hide')
  btnRepeat.removeAttribute('disabled');
  btnRepeat.classList.add('hide')
  classToggle(btnNew, 'hide');
  selectLvl.removeAttribute('disabled');
  classToggle(roundsCounter, 'hide');
  keyboard.classList.add('disable-all');
  field.textContent = '';
  correctCount = 0;
  round = 1;
});

// document.addEventListener('keydown', startGame());

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
