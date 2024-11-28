"use strict";

const response = await fetch('./assets/gifts.json');
const gifts = await response.json();

const OVERLAY = document.querySelector('.overlay');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

const GIFTS_CARDS = document.querySelector('.gifts__cards');

const TIMER_DAYS = document.querySelector('.timer-days');
const TIMER_HOURS = document.querySelector('.timer-hours');
const TIMER_MINUTES = document.querySelector('.timer-minutes');
const TIMER_SECONDS = document.querySelector('.timer-seconds');

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

function random(arr) {
  return arr.sort((a, b) => 0.5 - Math.random());
}

function genElem(tag, name) {
  tag = document.createElement(tag);
  name = tag.className = `${name}`;
  return tag;
}

function genCards(obj) {
  for (let i = 0; i < 4; i += 1) {
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

function nextYearCounter() {
  const nextYear = new Date().getFullYear() + 1;
  const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
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

//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

window.addEventListener('resize', function (event) {
  NAV_TOGGLE.checked = false;
  enableScroll();
});