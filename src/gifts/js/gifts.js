"use strict";

const response = await fetch('../assets/gifts.json');
const gifts = await response.json();

const OVERLAY = document.querySelector('.overlay');
const MODAL = document.querySelector('.modal');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const TABS_BTN = document.querySelectorAll('.tabs__btn');
const BTN_ALL = document.querySelector('.tabs__btn-all');
const BTN_WORK = document.querySelector('.tabs__btn-work');
const BTN_HEALTH = document.querySelector('.tabs__btn-health');
const BTN_HARMONY = document.querySelector('.tabs__btn-harmony');

const GIFTS_CARDS = document.querySelector('.gifts__cards');

const BTN_UP = document.querySelector('.btn-up');

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
  disableScroll();
}

function hideOverlay() {
  OVERLAY.classList.remove('overlay-show');
  enableScroll();
}

function showMenu() {
  NAV_TOGGLE.checked ? disableScroll() : enableScroll();
}

function hideMenu() {
  NAV_TOGGLE.checked = false;
  enableScroll();
}

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

function random(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}

function genElem(tag, name) {
  tag = document.createElement(tag);
  name = tag.className = `${name}`;
  return tag;
}

function genCards(obj) {
  for (let i = 0; i < obj.length; i += 1) {
     let giftId = i;
     let cat = obj[giftId].category.toLowerCase().split(' ');

     const CARD = genElem('div', `gifts__cards-item card card-${cat[1]}`);
     CARD.dataset.id = giftId + 1;
     GIFTS_CARDS.append(CARD);

     CARD.innerHTML = `
      <div class="gifts__cards-img card-img card-img-${cat[1]}"></div>
      <div class="gifts__cards-text card-text">
        <h4 class="card--${cat[1]}">${obj[giftId].category}</h3>
        <h3>${obj[giftId].name}</h3>
      </div>`;
    }
}

genCards(random(gifts));

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

//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

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

window.onscroll = () => { checkScroll() };

window.addEventListener('resize', function(event) {
  NAV_TOGGLE.checked = false;
  enableScroll();
});