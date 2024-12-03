"use strict";

const response = await fetch('../assets/gifts.json');
const gifts = await response.json();

const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');
const MODAL_CLOSE = document.querySelector('.close');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const TABS_BTN = document.querySelectorAll('.tabs__btn');
const BTN_ALL = document.querySelector('.tabs__btn-all');
const BTN_WORK = document.querySelector('.tabs__btn-work');
const BTN_HEALTH = document.querySelector('.tabs__btn-health');
const BTN_HARMONY = document.querySelector('.tabs__btn-harmony');

const GIFTS_CARDS = document.querySelector('.gifts__cards');

const BTN_UP = document.querySelector('.btn-up');

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

//////////////////////////////
// TO TOP BTN
//////////////////////////////

function checkScroll() {
  if (document.documentElement.scrollTop >= 300) { 
    BTN_UP.classList.add('btn-up_show') 
  };
  if (document.documentElement.scrollTop < 300) { 
    BTN_UP.classList.remove('btn-up_show') 
  };
}

function toPageTop() {
  document.documentElement.scrollTop = 0;
}

//////////////////////////////
// CARDS
//////////////////////////////

function genCards(obj) {
  for (let i = 0; i < obj.length; i += 1) {
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
// TABS
//////////////////////////////

const CARDS_ALL = document.querySelectorAll('.gifts__cards-item');
const CARDS_WORK = document.querySelectorAll('.card-work');
const CARDS_HEALTH = document.querySelectorAll('.card-health');
const CARDS_HARMONY = document.querySelectorAll('.card-harmony');

function hideCards() {
  CARDS_ALL.forEach((element) => { element.style.display = 'none'} );
  TABS_BTN.forEach((element) => { element.disabled = false; });
}

function showCards(category) {
  category.forEach((element) => { element.style.display = 'flex'} );
}

//////////////////////////////
// EVENTS
//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

MODAL_CLOSE.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

BTN_UP.addEventListener('click', toPageTop);

BTN_ALL.addEventListener('click', (event) => {
  hideCards();
  event.target.disabled = true;
  showCards(CARDS_ALL);
});

BTN_WORK.addEventListener('click', (event) => {
  hideCards();
  event.target.disabled = true;
  showCards(CARDS_WORK);
});

BTN_HEALTH.addEventListener('click', (event) => {
  hideCards();
  event.target.disabled = true;
  showCards(CARDS_HEALTH);
});

BTN_HARMONY.addEventListener('click', (event) => {
  hideCards();
  event.target.disabled = true;
  showCards(CARDS_HARMONY);
});

GIFTS_CARDS.childNodes.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    giftId = event.currentTarget.dataset.id;
    giftCat = event.currentTarget.dataset.cat;
    genModal(gifts);
    showOverlay();
  })
});

window.onscroll = () => { checkScroll() };

window.addEventListener('resize', function(event) {
  NAV_TOGGLE.checked = false;
  enableScroll();
  hideOverlay();
});