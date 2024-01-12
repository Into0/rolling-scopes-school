'use strict';

const response = await fetch('./questions.json');
const questions = await response.json();

const randomKey = (key) => {
  let keys = Object.keys(key);
  return key[parseInt(keys.length * Math.random(), 0)];
};

const WordId = randomKey(questions).id;
const wordChar = questions[WordId].word;
const wordHint = questions[WordId].hint;

let guessesCount = 0;

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

  main.className='hangman';
    wrapper.className = 'hangman__wrapper wrapper';
      gallow.className = 'gallow';
        gallowImg.className = 'gallow__img';
          img.src = './assets/gallows.svg';
          img.alt = 'gallow';
        man.className = 'gallow__man';
          manItem.className = 'gallow__man__item';
          img.src = './assets/head.svg';
          img.alt = 'gallow';
      word.className = 'word';
        field.className = 'word__field'
          secret.className = 'word__secret';
          [...wordChar].forEach((char) => {
            const secretChar = document.createElement('li');
            secretChar.className = 'word__secret-char';
            secret.append(secretChar);
          });
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

  document.body.append(main);
  main.append(wrapper);
  wrapper.append(gallow, word);
  gallow.append(gallowImg, man);
  gallowImg.append(img);
  man.append(manItem);
  manItem.append(img);
  word.append(field, keyboard);
  field.append(secret, hint, guesses);

  console.log(wordChar);

  return main;
};

generateElements();

function resetGame() {
  guessesCount += 1;
  if (guessesCount >= 6) {
    guessesCount = 0;
    document.querySelectorAll('.keyboard__btn').forEach(element => element.removeAttribute('disabled'));
    showPopup();
  }
}

function showPopup() {

}

document.querySelector('.keyboard').addEventListener('click', (event) => {
  const target = event.target.closest('.keyboard__btn');
  target.setAttribute('disabled', '');

  if (!wordChar.includes(target.innerHTML)) {
    resetGame();
    document.querySelector('.word__guesses').innerText = `${guessesCount} / 6`;
  } else {
    console.log(true);
  }

});
