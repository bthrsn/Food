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
    modalOpenBtn = document.querySelectorAll('[data-modal]');

  // функция для закрытия окна, так как она повторяется, а нужно следовать DRY = dont repeat yorself
  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''
  }

  const openModal = () => {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    // Если пользователь уже открыл окно, оно не будет открываться снова через указанное время
    clearInterval(modalTimerId);
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

  // Если кликаем вне окна - оно закрывается
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
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
  const modalTimerId = setTimeout(openModal, 50000);

  // Вызываем модальное окно если пользователь проскролил страницу до конца
  window.addEventListener('scroll', showModalByScroll);

      // Задача: шаблонизировать карточки меню
const menuCards = document.querySelector('.menu_cards');

// Создаем класс для карточек
// В будущем мы не знаем сколько классов мы захотим изменить, потому добавляем rest оператор
    class MenuItem {
      constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
    this.img = img;
    this.altimg = altimg;
    this.title = title;
    this.descr = descr;
    this.price = price;
    // classes будут массивом
    this.classes = classes;
    // передадим родителя, куда будем пушить элемент
    this.parent = document.querySelector(parentSelector);
    this.transfer = 27; 
    this.changeToUAH();
    }

  // метод для конвертации из долларов в гривны
    changeToUAH() {
      this.price = this.price * this.transfer;
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
        <img class="menu__item_img" src=${this.img} alt="${this.altimg}" />
        <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
        <div class="menu__item-descr">
        ${this.descr}
        </div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      // добавим родителя
      this.parent.append(element);
      // Как я самостоятельно решал, это более гибкий метод!
      // return menuCards.insertAdjacentHTML('afterbegin', card);
      }
  }

  // Получаем информацию для карточек с сервера с помощью get запроса
  const getResource = async (url) => {
    const res = await fetch(url);

    // Так как 404 или 500 не повлекут за собо ошибки, этот момент отрабтаем вручную с помощью свойств .ok и status
    if (!res.ok) {
        throw new Error(`Couldn't fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
  };

  // Способ формирования верстки с помощью класов
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  // Используем библиотеку axios для создания карточек
  axios.get(' http://localhost:3000/menu')
    .then(data => {
          data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(img, altimg, title, descr, price, '.menu .container').render();
          });
        });

  // Способ формирования верстки без классов - на лету. Он исполльзуется, когда такую верстку нужно построить только раз и не нужен шаблонизатор.
  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  //     function createCard(data) {
  //       data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement('div');
  //         // курс гривны к доллару
  //         const transfer = 27;

  //         element.classList.add('menu__item');

  //         element.innerHTML = `
  //         <img class="menu__item_img" src=${img} alt="${altimg}" />
  //         <h3 class="menu__item-subtitle">Меню ${title}</h3>
  //         <div class="menu__item-descr">
  //         ${descr}
  //         </div>
  //         <div class="menu__item-divider"></div>
  //         <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price * transfer}</span> грн/день</div>
  //         </div>
  //         `;

  //         document.querySelector('.menu .container').append(element);
  //       });
  //     };


// Задача: все формы принимают данные и отправляют на сервер
// выполним сначала с помощью XML 
  // const forms = document.querySelectorAll('form');

// создадим объект, в котором будут тексты сообщений
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Мы скоро с вами свяжемся',
    failure: 'Что-то пошло не так...' 
  }

// Повязываем нашу функцию получения данных к формам
  // forms.forEach(item => {
  //   bindPostData(item);
  // })

  // функция для работы с сервером 
  // Нужно указать. что это асинхронный код (async), чтобы не было ошибки, так как мы не знаем точное время, когда нам вернуться данные с promise
  const postData = async (url, data) => {
    // ставим await перед теми данными, которых нам нужно дождаться
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
// здесь тоже нужен await, так как тут тоже promise
    return await res.json();
  };

// функция получения данных из формы
    function bindPostData(form) {
      form.addEventListener('submit', (e) => {
        // в первую очередь отменим перезагрузку старницы
      e.preventDefault();

    //  блок с сообщением
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
          `;
    // Пока наше сообщение существует только в HTML коде и его нужно добавить на страницу методом append к форме
    // form.append(statusMessage);

    // Так как формы разные, делаем так, чтобы спиннер одинаково хорошо отображалмся
      form.insertAdjacentElement('afterend', statusMessage);
      
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // сохраним данные с помощью FormData
      const formData = new FormData(form);

      // Прием для изменения формата передачи данных из XML в JSON - создаем новый объект и переберем старые данные в него
      // const object = {};
      //   formData.forEach(function(value, key) {
      //     object[key] = value;
      //   });

      // Изменим код выше с помощью новых методов
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // Пример метода entries, превращая объект в массив массивов - матрицу
      // const obj = {a: 23, b: 50};
      // console.log(Object.entries(obj));

    // Тогда сюда вместо formData помещаем object
      // request.send(formData);
      // request.send(json);

      // Функция работы с сервером
      postData('http://localhost:3000/requests', json)
      // Обрабатываем результат запроса с помощью then
      .then(data => {
        // заменили request.remove на data - это те данные, которые нам вернул сервер
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);  
      }).finally(() => {
        form.reset(); 
      });

      // request.addEventListener('load', () => {
      //   if(request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     // очищаем форму после отправки
      //       form.reset();
      //       statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);    }
      // });
    });

  //  Делаем окно с красивым оповещением пользователя с помощью старого модального окна
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
    // Сперва спрячем это окно
      prevModalDialog.classList.add('hide');
      openModal();

      // Создадим новое окно с помощью js
      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class='modal__content'>
        <div class='modal__close' data-close>×</div>
        <div class='modal__title'>${message}</div>
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      
      // Сделаем временной интервал на показ окна
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
        }, 4000);
    }

  // разбираем fetch API
  // скопировано с jsonplaceholder.com - обращаемся к первой тудушке
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({name: 'Alex'}),
      // всегда желательно указывать заголовки, чтобы понимать какой тип данных мы отправляем
    //   headers: {
    //     'Content-type': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(json => console.log(json));
  }

  // получим доступ к базе данных db.json
  // fetch('http://localhost:3000/menu')
  //   .then(data => data.json())
  //   .then(res => console.log(res));

  // Задача: реализовать слайдер
  // Алгоритм: 

  // 1. получить элементы со страницы, 
const slides = document.querySelectorAll('.offer__slide'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next');

let current = document.querySelector('#current'),
    total = document.querySelector('#total');

  // 2. сделать индекс текущего слайда и получить общее количество слайдов
  let currentSlide = 0;
  const totalSlide = slides.length;

    // 3. Функции показа слайда и функция сокрытия остальных, и проверять условие перехода с первого на последний и наоборот
  function  showSlide(item) {
    slides[item].classList.remove('hide');

    if (totalSlide < 10) {
      total.innerHTML = `0${totalSlide}`;
    } else {
      total.innerHTML = `${totalSlide}`;
    }

    if (currentSlide < 10) {
      current.innerHTML = `0${currentSlide + 1}`;
    } else {
      current.innerHTML = `${currentSlide + 1}`;
    }
  }

  function hideSlide() {
    slides.forEach(item =>{
      item.classList.add('hide');
    });
  };

  // функции для стрелок
  const moveRight = () =>  {
    hideSlide();
    if (currentSlide >= totalSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    showSlide(currentSlide);
  };

  const moveLeft = () => {
    hideSlide();
    if (currentSlide <= 0) {
      currentSlide = totalSlide - 1;
    } else {
      currentSlide--;
    }
    showSlide(currentSlide);
  }
  // Навешиваем обработчик события клика на каждую стрелку
  next.addEventListener('click', moveRight);
  prev.addEventListener('click', moveLeft);

  // 4. При запуске страницы - определять сколько сладйдов всего и транслировать на страницу общее количество и текущий слайд
    hideSlide();
    showSlide(currentSlide);
});
