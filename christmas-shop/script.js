"use strict";

const response = await fetch('./assets/gifts.json');
const gifts = await response.json();

const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');
const MODAL_CLOSE = document.querySelector('.close');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const SLIDER_VIEW = document.querySelector('.slider__view');
const SLIDER_SLIDES = document.querySelector('.slider__slides');
const SLIDER_BTN_LEFT = document.querySelector('.slider__btn-left');
const SLIDER_BTN_RIGTH = document.querySelector('.slider__btn-right');

const GIFTS_CARDS = document.querySelector('.gifts__cards');

const TIMER_DAYS = document.querySelector('.timer-days');
const TIMER_HOURS = document.querySelector('.timer-hours');
const TIMER_MINUTES = document.querySelector('.timer-minutes');
const TIMER_SECONDS = document.querySelector('.timer-seconds');

let slidesTransX = document.querySelector('.slider__slides').style.transform;
let giftId;
let giftCat;

//////////////////////////////

//////////////////////////////

function enableScroll() {
  document.documentElement.classList.remove('stop-scroll');
}

function disableScroll() {
  document.documentElement.classList.add('stop-scroll');
}

function showOverlay() {
  OVERLAY.classList.add('overlay-show');
  MODAL.classList.add('modal-show');
  disableScroll();
}

function hideOverlay() {
  OVERLAY.classList.remove('overlay-show');
  MODAL.classList.remove('modal-show');
  enableScroll();
}

function showMenu() {
  NAV_TOGGLE.checked ? disableScroll() : enableScroll();
}

function hideMenu() {
  NAV_TOGGLE.checked = false;
  enableScroll();
}

function random(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}

function genElem(tag, name) {
  tag = document.createElement(tag);
  name = tag.className = `${name}`;
  return tag;
}

function genMultiElem(what, where, count, callBack) {
  for (let i = 0; i < count; i += 1) {
    const item = document.createElement(what);
    where.appendChild(item);
    callBack(item);
  }
}

//////////////////////////////
// MODAL
//////////////////////////////

// NEED REFACTOR

function genModal(obj) {
  const powers = obj[giftId].superpowers;
  const snowflake = Object.values(powers).map((char => Number(char.slice(1)) / 100));

  let modal_text_top = document.querySelector('.modal-text__top');
  let modal_powers = document.querySelector('.modal-powers');

  let modal__img = document.querySelector('.modal__img');

  modal__img.className = 'modal__img card-img';
  modal__img.classList.add(`card-img-${giftCat}`);

  modal_text_top.innerHTML =
    `<h4 class="card--${giftCat}">${obj[giftId].category}</h3>
    <h3>${obj[giftId].name}</h3>
    <p>${obj[giftId].description}</p>`;

  modal_powers.innerHTML = '';

  for (let i = 0; i < Object.keys(powers).length; i += 1) {
    let modal_powers_rov = genElem('div', 'modal-powers-row');
    modal_powers.appendChild(modal_powers_rov);
    genElem('h4', 'test');
    modal_powers_rov.appendChild(genElem('p', '')).innerText = `${Object.keys(powers)[i]}`;
    modal_powers_rov.appendChild(genElem('p', '')).innerText = `${Object.values(powers)[i]}`;
    modal_powers_rov.appendChild(genElem('ul', 'row-snowflake'));
  }

  let row_snowflake = document.querySelectorAll('.row-snowflake');

  for (let i = 0; i < 5; i += 1) {
    row_snowflake.forEach((elem) => {
      elem.appendChild(genElem('li', 'row-snowflake__item'));
    })
  }

  let row_snowflake_0 = row_snowflake[0].children;
  let row_snowflake_1 = row_snowflake[1].children;
  let row_snowflake_2 = row_snowflake[2].children;
  let row_snowflake_3 = row_snowflake[3].children;

  for (let i = 0; i < snowflake[0]; i += 1) {
    row_snowflake_0[i].classList.add('snowflake-opacity');
  }
  for (let i = 0; i < snowflake[1]; i += 1) {
    row_snowflake_1[i].classList.add('snowflake-opacity');
  }
  for (let i = 0; i < snowflake[2]; i += 1) {
    row_snowflake_2[i].classList.add('snowflake-opacity');
  }
  for (let i = 0; i < snowflake[3]; i += 1) {
    row_snowflake_3[i].classList.add('snowflake-opacity');
  }

}

// NEED REFACTOR


/*
     for (let i = 0; i < snowflake[0]; i += 1) {
      row_snowflake.forEach((elem) => {
        elem.childNodes[i].classList.add('snowflake-opacity');
      })
     }

*/

/*
  genMultiElem('li', row_snowflake, 5, item => {
    item.classList.add('row-snowflake__item');
  });


  let row_snowflake_item = document.querySelectorAll('.row-snowflake__item');

  for (let i = 0; i < snowflake[0]; i += 1) {
    row_snowflake_item[i].classList.add('snowflake-opacity');
   }

   */

/* for (let i = 0; i < snowflake[0]; i += 1) {
  row_snowflake.removeChild(row_snowflake.children[0]);
 }
 */

/*
MODAL.innerHTML = `.
  <div class="close">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M30 10L10 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M10 10L30 30" stroke="#181C29" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    <span></span>
  </div>
  <div class="modal__img card-img card-img-${giftCat}"></div>
  <div class="modal-text card-text">
    <div class="modal-text__top">
      <h4 class="card--${giftCat}">${obj[giftId].category}</h3>
      <h3>${obj[giftId].name}</h3>
      <p>${obj[giftId].description}</p>
    </div>
    <div class="modal-text__bottom">
      <h4>Adds superpowers to:</h4>
      <div class="modal-powers">
        <div class="modal-powers-row modal-powers-${Object.keys(superpowers)[0]}">
          <p>${Object.keys(superpowers)[0]}</p>
          <p>${Object.values(superpowers)[0]}</p>
          <ul class="row-snowflake row-snowflake-0">

          </ul>
        </div>
        <div class="modal-powers-row modal-powers-${Object.keys(superpowers)[1]}">
          <p>${Object.keys(superpowers)[1]}</p>
          <p>${Object.values(superpowers)[1]}</p>
          <ul class="row-snowflake row-snowflake-1">

          </ul>
        </div>
        <div class="modal-powers-row modal-powers-${Object.keys(superpowers)[2]}">
          <p>${Object.keys(superpowers)[2]}</p>
          <p>${Object.values(superpowers)[2]}</p>
          <ul class="row-snowflake row-snowflake-2">

          </ul>
        </div>
        <div class="modal-powers-row modal-powers-${Object.keys(superpowers)[3]}">
          <p>${Object.keys(superpowers)[3]}</p>
          <p>${Object.values(superpowers)[3]}</p>
          <ul class="row-snowflake row-snowflake-3">
 
          </ul>
        </div>
      </div>
    </div>
  </div>`;
  let row_snowflake = document.querySelectorAll('.row-snowflake');
  genMultiElem('li', row_snowflake, snowflake[0], item => {
    item.classList.add('row-snowflake__item');
  })
return MODAL;
*/

//////////////////////////////
// SLIDER
//////////////////////////////

function prevSlide() {
  let steps;
  if (document.body.offsetWidth <= 768) { steps = 6 };
  if (document.body.offsetWidth > 768) { steps = 3 };

  const stepSize = Math.ceil((SLIDER_SLIDES.clientWidth - SLIDER_VIEW.clientWidth) / steps);
  SLIDER_SLIDES.style.transform = `translateX(${slidesTransX += stepSize}px)`;

  SLIDER_BTN_RIGTH.disabled = false;

  if (slidesTransX === 0) {
    SLIDER_BTN_LEFT.disabled = true;
  }
}

function nextSlide() {
  let steps;
  if (document.body.offsetWidth <= 768) { steps = 6 };
  if (document.body.offsetWidth > 768) { steps = 3 };

  const stepSize = Math.ceil((SLIDER_SLIDES.clientWidth - SLIDER_VIEW.clientWidth) / steps);
  SLIDER_SLIDES.style.transform = `translateX(${slidesTransX -= stepSize}px)`;

  SLIDER_BTN_LEFT.disabled = false;

  if (slidesTransX <= SLIDER_VIEW.clientWidth - SLIDER_SLIDES.clientWidth) {
    SLIDER_BTN_RIGTH.disabled = true;
  }
}
//////////////////////////////
// CARDS
//////////////////////////////

function genCards(obj) {
  for (let i = 0; i < 4; i += 1) {
    giftId = i;
    giftCat = obj[giftId].category.toLowerCase().split(' ').pop();

    const CARD = genElem('div', `gifts__cards-item card card-${giftCat}`);
    CARD.dataset.id = giftId;
    CARD.dataset.cat = giftCat;
    GIFTS_CARDS.append(CARD);

    CARD.innerHTML = `
      <div class="gifts__cards-img card-img card-img-${giftCat}"></div>
      <div class="gifts__cards-text card-text">
        <h4 class="card--${giftCat}">${obj[giftId].category}</h3>
        <h3>${obj[giftId].name}</h3>
      </div>`;
  }

}

genCards(random(gifts));

//////////////////////////////
// TIMER
//////////////////////////////

function nextYearCounter() {
  const nextYear = new Date().getFullYear() + 1;
  const newYear = Date.UTC(`${nextYear}`);
  const curYear = new Date();
  const timeLeft = newYear - curYear;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(timeLeft / day);
  const hours = Math.floor((timeLeft % day) / hour);
  const minutes = Math.floor((timeLeft % hour) / minute);
  const seconds = Math.floor((timeLeft % minute) / second);

  TIMER_DAYS.innerText = days;
  TIMER_HOURS.innerText = hours;
  TIMER_MINUTES.innerText = minutes;
  TIMER_SECONDS.innerText = seconds;

  setTimeout(nextYearCounter, 1000);
}

nextYearCounter();

//////////////////////////////
// EVENTS
//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

MODAL_CLOSE.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

SLIDER_BTN_LEFT.addEventListener('click', prevSlide);
SLIDER_BTN_RIGTH.addEventListener('click', nextSlide);

GIFTS_CARDS.childNodes.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    giftId = event.currentTarget.dataset.id;
    giftCat = event.currentTarget.dataset.cat;
    genModal(gifts);
    showOverlay();
  })
});

window.addEventListener('resize', (event) => {
  NAV_TOGGLE.checked = false;
  enableScroll();
  SLIDER_SLIDES.style.transform = `translateX(0)`;
  slidesTransX = 0;
  SLIDER_BTN_RIGTH.disabled = false;
  SLIDER_BTN_LEFT.disabled = true;
});