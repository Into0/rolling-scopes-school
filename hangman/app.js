'use strict';

const response = await fetch('./questions.json');
const questions = await response.json();

const randomKey = (key) => {
  let keys = Object.keys(key);
  return key[parseInt(keys.length * Math.random(), 0)];
};

let WordId;
let wordChar;
let wordHint;

let wrongCount = 0;
let correctCount = 0;

function generateElements() {
  const main = document.createElement('main');
  const wrapper = document.createElement('div');
  const gallow = document.createElement('div');
  const gallowImg = document.createElement('div');
  const img = document.createElement('img');
  const man = document.createElement('div');
  const manItem = document.createElement('div');
  const word = document.createElement('div');
  const field = document.createElement('div');
  const secret = document.createElement('ul');
  const hint = document.createElement('p');
  const guesses = document.createElement('span');
  const keyboard = document.createElement('div');
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

  const overlay = document.createElement('div');
  overlay.classList = 'overlay';
  main.append(overlay);

  const popup = document.createElement('div');
  popup.classList = 'popup';
  overlay.append(popup);

  const popupText = document.createElement('span');
  popupText.classList = 'popup__text';

  const answer = document.createElement('span');
  answer.classList = 'popup__answer';

  const butn = document.createElement('button');
  butn.classList = 'popup__btn btn';
  butn.innerText = 'play again';
  popup.append(popupText, answer, butn);

  main.className='hangman';
    wrapper.className = 'hangman__wrapper wrapper';
      gallow.className = 'gallow';
        gallowImg.className = 'gallow__img';
          img.src = './assets/gallows.svg';
          img.alt = 'gallow';
        man.className = 'gallow__man';
      word.className = 'word';
        field.className = 'word__field'
          secret.className = 'word__secret';
          hint.className = 'word__hint';
          hint.innerText = 'Hint: ' + wordHint;
          guesses.className = 'word__guesses';
          guesses.innerText = `0 / 6`;
        keyboard.className = 'keyboard';
          alphabet.forEach((key) => {
            const button = document.createElement('button');
            button.className = 'keyboard__btn btn';
            button.innerText = key;
            keyboard.append(button);
          });
for (let i = 1; i <= 6; i += 1) {
    let img = document.createElement('img');
    img.src = `./assets/man${i}.svg`;
    img.alt = 'gallow man';
    img.classList = `man-img man-img${i}`;
    man.append(img);
  }

  document.body.append(main);
  main.append(wrapper);
  wrapper.append(gallow, word);
  gallow.append(gallowImg, man);
  gallowImg.append(img);
  word.append(field, keyboard);
  field.append(secret, hint, guesses);

  console.log(wordChar);

  return main;
};

generateElements();

function startGame() {
  resetGame();
  const secret = document.querySelector('.word__secret');
  const hint = document.querySelector('.word__hint');

  WordId = randomKey(questions).id;
  wordChar = questions[WordId].word;
  wordHint = questions[WordId].hint;
  [...wordChar].forEach((char) => {
    const secretChar = document.createElement('li');
    secretChar.className = 'word__secret-char';
    secret.append(secretChar);
  });
  hint.innerText = 'Hint: ' + wordHint;
  document.querySelector('.popup__answer').innerText = 'secret: ' + wordChar;

  document.addEventListener('keydown', keyboardPresed);
  console.log(wordChar);
}

startGame();

function showPopup() {
  document.removeEventListener('keydown', keyboardPresed);
  document.querySelector('.overlay').classList.add('overlay__show');
  document.querySelector('.popup').classList.add('popup__show');
  document.documentElement.style.overflow = 'hidden';
  if (wrongCount === 6) {
    document.querySelectorAll('.man-img').forEach(element => element.classList.add('man-show'));
  }
}

function resetGame() {
  wrongCount = 0;
  correctCount = 0;
  document.querySelector('.word__guesses').innerText = `${wrongCount} / 6`;
  document.querySelectorAll('.keyboard__btn').forEach(element => element.removeAttribute('disabled'));
  document.querySelectorAll('.word__secret-char').forEach(element => element.innerText = '');
  document.querySelectorAll('.word__secret-char').forEach(element => element.remove());
  document.querySelectorAll('.man-img').forEach(element => element.classList.remove('man-show'));
  document.querySelector('.overlay').classList.remove('overlay__show');
  document.querySelector('.popup').classList.remove('popup__show');
  document.querySelector('.popup__btn').blur();
}

document.querySelector('.keyboard').addEventListener('click', (event) => {
  const target = event.target.closest('.keyboard__btn');
  const wordSec = document.querySelectorAll('.word__secret-char');

  target.setAttribute('disabled', '');

  if (!wordChar.includes(target.innerHTML)) {
    wrongCount += 1;
    if (wrongCount === 6) showPopup();
    document.querySelector(`.man-img${wrongCount}`).classList.add('man-show');
    document.querySelector('.popup__text').innerText = 'you lose';
    document.querySelector('.word__guesses').innerText = `${wrongCount} / 6`;
  } else {
    const wordSec = document.querySelectorAll('.word__secret-char');
    document.querySelector('.popup__text').innerText = 'you win';
    for (let i = 0; i < wordChar.length; i += 1) {
      if (wordChar[i].indexOf(target.innerHTML) >= 0) {
        wordSec[i].innerText = target.innerHTML;
        wordSec[i].classList.add('underline-hide');
        correctCount += 1;
        if (correctCount == wordChar.length) showPopup();
      }
    }
  }

});

function keyboardPresed() {

  const keyboardBtns = document.querySelectorAll('.keyboard__btn');

  keyboardBtns.forEach((element) => {
    if (element.hasAttribute('disabled')) return;

    if (element.textContent === event.key) {
      element.setAttribute('disabled', '');
      if (!wordChar.includes(element.innerHTML)) {
        wrongCount += 1;
        if (wrongCount >= 6) showPopup();
        document.querySelector(`.man-img${wrongCount}`).classList.add('man-show');
        document.querySelector('.popup__text').innerText = 'you lose';
        document.querySelector('.word__guesses').innerText = `${wrongCount} / 6`;
      } else {
        const keyboardBtns = document.querySelectorAll('.word__secret-char');
        document.querySelector('.popup__text').innerText = 'you win';
        for (let i = 0; i < wordChar.length; i += 1) {
          if (wordChar[i].indexOf(element.innerHTML) >= 0) {
            keyboardBtns[i].innerText = element.innerHTML;
            keyboardBtns[i].classList.add('underline-hide');
            correctCount += 1;
            if (correctCount == wordChar.length) showPopup();
          }
        }
      }
    }
  });

}

document.querySelector('.popup__btn').addEventListener('click', startGame);
document.addEventListener('keydown', keyboardPresed);
