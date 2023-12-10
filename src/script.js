const SLIDER = document.querySelector('.slider');
const SLIDEPREV = document.querySelector('.slider__btn-prev');
const SLIDENEXT = document.querySelector('.slider__btn-next');
const PROGRESS = document.querySelector('.progress__item');
const SLIDES = document.querySelector('.slider__slides');

let translateX = 0;
let progressvalue = 0;
let interval = setInterval(moveProgress, 50);
let slideInterval = setInterval(nextSlide, 5000);

function prevSlide() {
  SLIDES.style.transform = `translateX(${translateX += 140}%)`;
  if (translateX > 0) {
    translateX = 0;
    SLIDES.style.transform = `translateX(${translateX -= 280}%)`;
  }
}

function nextSlide() {
  SLIDES.style.transform = `translateX(${translateX -= 140}%)`;
  if (translateX < -280) {
    translateX = 0;
    SLIDES.style.transform = `translateX(${translateX -= 0}%)`;
  }
}

function moveProgress() {
  progressvalue = progressvalue == 100 ? 0 : progressvalue += 1;
  PROGRESS.value = progressvalue;
}

setInterval(() => {
  if (document.querySelector(".slider__slides:hover") != null) {
    interval_stop();
    interval_start();
  }
}, 80);

function interval_start() {
  interval = setInterval(moveProgress, 50);
  slideInterval = setInterval(nextSlide, 5000);
};

function interval_stop() {
  interval = clearInterval(interval);
  slideInterval = clearInterval(slideInterval);
};


SLIDENEXT.addEventListener('click', nextSlide);
SLIDEPREV.addEventListener('click', prevSlide);
