// Функционал затемнения слайдера
window.onload = () => {
  const options = {
    root: document.querySelector('.articles__container'),
    rootMargin: '0px',
    threshold: [0, 1],
  };

  // создаем наблюдатель
  const observer = new IntersectionObserver((entries) => {
    // для каждой записи-целевого элемента
    entries.forEach((entry) => {
      const lazyImg = entry.target;
      // если элемент полностью виден на странице или полностью скрыт за пределами родительского контейнера
      if (entry.intersectionRatio === 1 || entry.intersectionRatio === 0) {
        lazyImg.style.opacity = '1'; // делаем элемент непрозрачным
      } else if (lazyImg.style.opacity !== '0.2') {
        lazyImg.style.opacity = '0.2'; // делаем элемент прозрачным, если его opacity не равно 0.2
      }
    });
  }, options);

  // с помощью цикла следим за всеми img на странице
  const arr = document.querySelectorAll('.item-block__item');
  arr.forEach((i) => {
    observer.observe(i);
  });
};

// Слайдер
const contentField = document.getElementById('contentField');

// Функция для прокрутки вперед
function scrollForward() {
  contentField.scrollBy({ left: 250, behavior: 'smooth' });
}

// Функция для прокрутки назад
async function scrollBack() {
  contentField.scrollBy({ left: -250, behavior: 'smooth' });
}

const forwardButton = document.getElementById('forwardButton');
forwardButton.addEventListener('click', scrollForward);

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', scrollBack);

// фоновый блок затемнения
const blueOverlay = document.getElementById('blue-overlay');

// появление / скрытие верхнего выпадающего меню
document.addEventListener('click', function (event) {
  var pageOverlay = document.createElement('div');
  var menu = document.getElementById('search-menu');
  var menuButton = document.getElementById('search-menu__button');

  if (event.target === menuButton) {
    menu.classList.toggle('open');
    menuButton.classList.toggle('open');
    blueOverlay.style.display = 'none';
    if (menu.classList.contains('open')) {
      blueOverlay.style.display = 'block';
    }
  } else if (!menu.contains(event.target)) {
    blueOverlay.style.display = 'none';
    menu.classList.remove('open');
    menuButton.classList.remove('open');
  }
});

// функционал выпадающих меню directions
function showContent(index, element) {
  var overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  // Скрываем все содержимое и Удаляем класс "selected" у всех пунктов списка
  var contents = document.getElementsByClassName('direction');
  for (var i = 0; i < contents.length; i++) {
    contents[i].style.display = 'none';
  }
  var listItems = document.getElementsByTagName('li');
  for (var i = 0; i < listItems.length; i++) {
    listItems[i].classList.remove('selected');
  }

  // Отображаем содержимое для выбранного пункта
  var selectedContent = document.getElementById('direction' + index);
  selectedContent.style.opacity = '1';
  selectedContent.style.display = 'block';

  element.classList.add('selected');

  // Закрываем содержимое при клике вне блока
  function handleClickOutside(event) {
    if (
      !selectedContent.contains(event.target) &&
      event.target !== element &&
      !event.target.closest('.header__nav__li')
    ) {
      selectedContent.style.opacity = '0';
      selectedContent.style.display = 'none';

      element.classList.remove('selected');
      overlay.remove(); // Удаляем слой при закрытии
      document.removeEventListener('click', handleClickOutside); // Удаляем обработчик события клика вне блока
    }
  }

  // Предотвращаем закрытие содержимого при клике внутри блока
  function handleClickInside(event) {
    event.stopPropagation();
  }

  document.addEventListener('click', handleClickOutside);
  selectedContent.addEventListener('click', handleClickInside);
}

// МОБИЛЬНАЯ ВЫПАДАЙКА
const icon = document.querySelector('.drop-mobile__icon');
const menu = document.querySelector('.drop-mobile');
let overlay;

icon.addEventListener('click', function () {
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
  }

  menu.classList.toggle('active');
  if (menu.classList.contains('active')) {
    icon.style.backgroundImage = "url('./assets/images/drop-downs/mobile-close.svg')";
  } else {
    icon.style.backgroundImage = "url('./assets/images/drop-downs/mobile-drop.svg')";
    document.body.removeChild(overlay); // Удаляем слой при закрытии выпадайки
    overlay = null; // Сбрасываем значение overlay
  }
});

document.addEventListener('click', function (event) {
  if (!menu.contains(event.target) && !icon.contains(event.target)) {
    menu.classList.remove('active');
    icon.style.backgroundImage = "url('./assets/images/drop-downs/mobile-drop.svg')";
    document.body.removeChild(overlay); // Удаляем слой при закрытии выпадайки
    overlay = null; // Сбрасываем значение overlay
  }
});

// второй уровень вложенности

const menuItems = document.querySelectorAll('.drop-mobile-item');
const contents = document.querySelectorAll('.drop-mobile__content');
const blockSearch = document.querySelector('.block-search');

let previousTarget = null;

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');

    if (target === previousTarget) {
      contents.forEach((content) => {
        content.style.display = 'none';
      });

      menuItems.forEach((menuItem) => {
        menuItem.classList.remove('selected');
        menuItem.style.display = 'block';
      });

      blockSearch.style.display = 'block';

      previousTarget = null;
    } else {
      contents.forEach((content) => {
        if (content.id === `${target}-content`) {
          content.style.display = 'block';
        } else {
          content.style.display = 'none';
        }
      });

      menuItems.forEach((menuItem) => {
        if (menuItem !== item) {
          menuItem.style.display = 'none';
        }
      });

      item.classList.add('selected');
      blockSearch.style.display = 'none';

      previousTarget = target;
    }
  });
});
