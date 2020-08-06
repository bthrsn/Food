// Задача, сделать переключатель табов

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  // Функция скрывает табы и удаляет класс активности с заголовков
  const hideTabContent = () => {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade')
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  // Функция раскрывает нужный таб
  // В эту функция сразу передадим параметр по умолчанию, возможно начиная с ES6
  const showTabContent = (i = 0) => {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');

    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();

  // В этой функции при первом вызове показываем первый слайд, потому в аргументах стоит первый элемент
  showTabContent();

  // Назначить событие кликом
  tabsParent.addEventListener('click', (event) => {
    // Объявим event.target в переменную, чтобы постоянно ее не писать
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }

  });

  // Задача, сделать таймер

  const deadline = '2020-09-17';

  const getTimeRemaining = (endtime) => {
    // делаем тех переменную, в которой будет количество оставшихся миллисекунд
    const t = Date.parse(endtime) - Date.parse(new Date()),
      // Переменные в которые помещаем остаток времени
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    // Но возвращаем мы объект с данными
    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    }
  }
  // Функция добавления нуля
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`
    } else {
      return num
    }
  }
  // Функция устанавливает таймер на страницу
  const setClock = (selector, endtime) => {
    // берем первый таймер на странице
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds');


    // внутри функция обновляет часы
    const updateClock = () => {
      // Сколько осталось времени до дедлайна
      const t = getTimeRemaining(endtime);

      // Выводим полученные значения на страницу
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // Останавливаем таймер
      if (t.total <= 0) {
        clearInterval(timeInterval)
      }
    }
    // Запускаем обновление времени каждую секунду
    const timeInterval = setInterval(updateClock, 1000);
    // Вызов функции, чтобы не было моргания верстки через 1 секунду
    updateClock();
  }

  setClock('.timer', deadline);

});