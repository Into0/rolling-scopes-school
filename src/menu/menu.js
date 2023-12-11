const response = await fetch('../assets/products.json');
const products = await response.json();

const NAV_TOGGLE = document.querySelector('#nav__toggle');
const NAV_LINK = document.querySelectorAll('.nav__menu-link');
const OVERLAY = document.querySelector('.overlay');
const POPUP = document.querySelector('.popup');
const CATEGORY = document.querySelector('.category');

let productsId;

//////////////////////////////

//////////////////////////////

function showMenu() {
  if (NAV_TOGGLE.checked) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = 'visible';
  }
}

function showOverlay() {
  OVERLAY.classList.add('overlay__show');
  document.documentElement.style.overflow = 'hidden';
}

function hideOverlay() {
  OVERLAY.classList.remove('overlay__show');
  POPUP.classList.remove('popup__show');
  NAV_TOGGLE.checked = false;
  document.documentElement.style.overflow = 'visible';
}

function generatePopup(products) {
  POPUP.innerHTML = `
    <div class="popup__wrapper">
      <div class="popup__img">
        <img src="${products[productsId].img}" alt="popup">
      </div>
      <div class="popup__text">
        <div class="popup__title">
          <h3>${products[productsId].name}</h3>
          <p>${products[productsId].description}</p>
        </div>
        <div class="popup__size">
          <span>Size</span>
          <div class="popup__tab tab">
            <button class="tab__item tab__item-act btn btn_dark btn_act"><span>S</span>${products[productsId].sizes.s.size}</button>
            <button class="tab__item btn btn_dark"><span>M</span>${products[productsId].sizes.m.size}</button>
            <button class="tab__item btn btn_dark"><span>L</span>${products[productsId].sizes.l.size}</button>
          </div>
        </div>
        <div class="popup__additives">
          <span>Additives</span>
          <div class="popup__tab tab">
            <button class="tab__item btn btn_dark"><span>1</span>${products[productsId].additives[0].name}</button>
            <button class="tab__item btn btn_dark"><span>2</span>${products[productsId].additives[1].name}</button>
            <button class="tab__item btn btn_dark"><span>3</span>${products[productsId].additives[2].name}</button>
          </div>
        </div>
        <div class="popup__total">
          <h3>Total:</h3>
          <h3>$${products[productsId].price}</h3>
        </div>
        <div class="alert">
          <img src="../assets/icons/info-empty.svg" alt="info">
          <p>The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
        </div>
        <button class="popup__close btn btn_dark">Close</button>
      </div>
    </div>`;
  return POPUP;
}

function showPopup() {
  if (POPUP.classList.contains('popup__show')) {
    hideOverlay();
  } else {
    showOverlay();
    POPUP.classList.add('popup__show');
  }
}

//////////////////////////////

//////////////////////////////

CATEGORY.onclick = function(event) {
  if (!event.target.closest('.category__item')) return;
  productsId = event.target.closest('.category__item').dataset.id;
  generatePopup(products);
  showPopup();
};

POPUP.onclick = function(event) {
  if (!event.target.closest('.popup__close')) return;
  hideOverlay();
};

OVERLAY.addEventListener('click', hideOverlay);

NAV_LINK.forEach((elem) => {
  elem.addEventListener('click', hideOverlay);
});

NAV_TOGGLE.addEventListener('change', showMenu);
