// Импорт полифила для промисов
require('es6-promise/auto');
// Импорт полифила для forEach - так как мы его установили как npm пакет, берем его из папки node modules
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  // Вызываем модальное окно через некоторое время
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
  
  calc();
  cards();
  forms('form', modalTimerId);
  modal('[data-modal]', '.modal', modalTimerId);
  slider({
    container: '.offer__slider', 
    nextArrow: '.offer__slider-next', 
    prevArrow: '.offer__slider-prev', 
    slide: '.offer__slide', 
    totalCounter: '#total', 
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.offer__slider-inner',
  });
  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  timer('.timer', '2020-10-31');
});
