import { WOW } from './vendor/wow.min';
import detectDevice from './components/detectDevice';

import { openModal } from './components/modal';
import GTMEvents from './components/gtmEvents';
import Animations from './components/animations';
import handleTooltip from './components/tooltip';
import pricesData from './pricesData';

const GTM = new GTMEvents();
const animation = new Animations();

/// /////// DocReady //////////
document.addEventListener('DOMContentLoaded', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();

  GTM.addEventListeners();
  animation.init();
  scrollTeaser(document.querySelector('.shop'));
  goNextSection();
  openPopup();
  handleTooltip();
  handleFAQopening();
  setPrices();
});

// scroll to next section
function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

function stringifyPrice(price) {
  const priceArray = price.toString().split('');
  priceArray.splice(-3, 0, ' ');
  return `${priceArray.join('')}&nbsp;₽`;
}

function setPrices() {
  const shopItemList = document.querySelectorAll('.shop-item');
  shopItemList.forEach((item) => {
    if (item.id) {
      const itemObj = pricesData.filter((smartphone) => smartphone.id === item.id)[0];
      const oldPriceElement = item.querySelector('.price__old');
      const newPriceElement = item.querySelector('.price__new');
      const { newPrice, oldPrice } = itemObj;

      oldPriceElement.innerHTML = stringifyPrice(oldPrice);
      newPriceElement.innerHTML = stringifyPrice(newPrice);
    }
  });
}
function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (document.location.hash === '#about') {
    scrollToElement(el);
  }
}
// open pop-up modal
function openPopup() {
  const popupLink = document.querySelector('.popup__link');
  popupLink.addEventListener('click', () => openModal('#popup-modal-box'));
}

function setActive(arr) {
  const activeClassName = 'active';
  arr.forEach((el) => {
    const itemText = el.childNodes[3]; // хардкод текстового дочернего узла
    if (el.classList.contains(activeClassName)) {
      itemText.style.transition = 'none';
      el.classList.remove(activeClassName);
    }
  });
}

// open FAQ-items
function handleFAQopening() {
  const itemsList = document.querySelectorAll('.faq__item');
  const activeClassName = 'active';
  itemsList.forEach((item) => {
    item.addEventListener('click', () => {
      const itemText = item.childNodes[3]; // хардкод текстового дочернего узла
      if (item.classList.contains(activeClassName)) {
        itemText.style.transition = 'none';
        item.classList.remove(activeClassName);
      } else {
        setActive(itemsList);
        itemText.style.transition = '0.2s ease-in-out';
        item.classList.add(activeClassName);
      }
    });
  });
}
