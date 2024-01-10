'use strict';

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
      word.className = 'word';
        field.className = 'word__field'
          secret.className = 'word__secret';
          hint.className = 'word__hint';
          guesses.className = 'word__guesses';
        keyboard.className = 'keyboard';
          alphabet.forEach((char) => {
            const button = document.createElement('button');
            button.className = 'keyboard__btn btn';
            button.innerText = char;
            keyboard.append(button);
          });

  document.body.append(main);
  main.append(wrapper);
  wrapper.append(gallow, word);
  gallow.append(gallowImg, man);
  gallowImg.append(img);
  man.append(manItem);
  word.append(field, keyboard);
  field.append(secret, hint, guesses);

  return main;
}

generateElements();
