"use strict";

const response = await fetch('../assets/gifts.json');
const gifts = await response.json();

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');

//////////////////////////////

//////////////////////////////

function enableScroll() {
  document.documentElement.classList.remove('stop-scroll');
}

function disableScroll() {
  document.documentElement.classList.add('stop-scroll');
}

function showMenu() {
  NAV_TOGGLE.checked ? disableScroll() : enableScroll()
}

function hideMenu() {
  NAV_TOGGLE.checked = false;
  enableScroll();
}

//////////////////////////////

//////////////////////////////

NAV_TOGGLE.addEventListener('change', showMenu);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideMenu);
});

window.addEventListener('resize', function(event) {
  NAV_TOGGLE.checked = false;
  enableScroll()
});