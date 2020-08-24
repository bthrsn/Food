window.addEventListener('DOMContentLoaded', () => {

  // Задача, сделать переключатель табов
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

  // Задача, сделать модальное окно
  // Делаем через дата атрибуты
  const modal = document.querySelector('.modal'),
    modalOpenBtn = document.querySelectorAll('[data-modal]'),
    modalCloseBtn = document.querySelector('[data-close]');

  // функция для закрытия окна, так как она повторяется, а нужно следовать DRY = dont repeat yorself
  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
  }

  const openModal = () => {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Если пользователь уже открыл окно, оно не будет открываться снова через указанное время
    // clearInterval(modalTimerId);
  }

  // остановим показ модального окна после первой прокрутки
  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);  
    }
  }

  modalOpenBtn.forEach(item => {
    item.addEventListener('click', openModal);
  });

  modalCloseBtn.addEventListener('click', closeModal);

  // Если кликаем вне окна - оно закрывается
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Закрываем окно на клавишу esc
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  // Вызываем модальное окно через некоторое время
  // const modalTimerId = setTimeout(openModal, 5000);

  // Вызываем модальное окно если пользователь проскролил страницу до конца
  window.addEventListener('scroll', showModalByScroll);

      // Задача: шаблонизировать карточки меню
// const menuCards = document.querySelector('.menu_cards');

// Создаем класс для карточек
// В будущем мы не знаем сколько классов мы захотим изменить, потому добавляем rest оператор
class MenuItem {
  constructor(img, subtitle, description, total, parentSelector, ...classes) {
this.img = img;
this.subtitle = subtitle;
this.description = description;
this.total = total;
// classes будут массивом
this.classes = classes;
// передадим родителя, куда будем пушить элемент
this.parent = document.querySelector(parentSelector);
this.transfer = 27; 
this.changeToUAH();
}

// метод для конвертации из долларов в гривны
changeToUAH() {
  this.total = this.total * this.transfer;
}

    render() {
      const element = document.createElement('div');
      // Rest оператор не поддерживает параметр по умолчанию, потому делаем параметр по умолчанию через логическое выражение
      if(this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
      // добавляем наш список классов к HTML разметке
      this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
      <img class="menu__item_img" src=${this.img} alt="${this.subtitle}" />
      <h3 class="menu__item-subtitle">Меню ${this.subtitle}</h3>
      <div class="menu__item-descr">
      ${this.description}
      </div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
      </div>
    `;
    // добавим родителя
    this.parent.append(element);
    // Как я самостоятельно решал, так уже не делают
    // return menuCards.insertAdjacentHTML('afterbegin', card);
    }

}
// Создаем три карточки
new MenuItem(
  "img/tabs/vegy.jpg", 
  '"Фитнес"', 
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
  '9',
  '.menu .container',
  ).render();

new MenuItem(
"img/tabs/elite.jpg", 
'"Премиум"', 
'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты,  фрукты - ресторанное меню без похода в ресторан!', 
'20',
'.menu .container',
).render();

new MenuItem(
  "img/tabs/post.jpg", 
  '"Постное"', 
  'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
  '17',
  '.menu .container',
  ).render();

// Задача: все формы принимают данные и отправляют на сервер
// выполним сначала с помощью XML 
const forms = document.querySelectorAll('form');

// создадим объект, в котором будут тексты сообщений
const message = {
  loading: 'Загрузка',
  success: 'Спасибо! Мы скоро с вами свяжемся',
  failure: 'Что-то пошло не так...' 
}

// Повязываем нашу функцию получения данных к формам
forms.forEach(item => {
  postData(item);
})

// функция получения данных из формы
function postData(form) {
  form.addEventListener('submit', (e) => {
    // в первую очередь отменим перезагрузку старницы
 e.preventDefault();

//  блок с сообщением
const statusMessage = document.createElement('div');
statusMessage.classList.add('status');
statusMessage.textContent = message.loading;
// Пока наше сообщение существует только в HTML коде и его нужно добавить на страницу методом append к форме
form.append(statusMessage);
  
  const request = new XMLHttpRequest();
  request.open('POST', 'server.php');

  // Если используем XML заголовок устанавливать не нужно
  request.setRequestHeader('Content-type', 'application/json');
  // сохраним данные с помощью FormData
  const formData = new FormData(form);

  // Прием для изменения формата передачи данных из XML в JSON - создаем новый объект и переберем старые данные в него
const object = {};
formData.forEach(function(value, key) {
  object[key] = value;
});
// создаем переменную для наглядности перевода методом stringify, но можно и сразу
const json = JSON.stringify(object);

// Тогда сюда вместо formData помещаем object
  // request.send(formData);
  request.send(json);

  request.addEventListener('load', () => {
    if(request.status === 200) {
      console.log(request.response);
      statusMessage.textContent = message.success;
      // очищаем форму после отправки
      form.reset();
      // Удаляем сообщение через некоторое время
      setTimeout(() => {
        statusMessage.remove();
      }, 2000);

    } else {
      statusMessage.textContent = message.failure;
    }
  });
  });
}
});
