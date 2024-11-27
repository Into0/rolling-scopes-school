"use strict";

const response = await fetch('../assets/gifts.json');
const gifts = await response.json();

const OVERLAY = document.querySelector('.overlay');

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

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

//////////////////////////////

//////////////////////////////

OVERLAY.addEventListener('click', hideOverlay);

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

BTN_UP.addEventListener('click', toPageTop);

window.onscroll = () => { checkScroll() };

window.addEventListener('resize', function(event) {
  NAV_TOGGLE.checked = false;
  enableScroll();
});