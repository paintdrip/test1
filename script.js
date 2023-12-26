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

// появление / скрытие верхнего выпадающего меню
document.addEventListener('click', function (event) {
  var pageOverlay = document.createElement('div');
  var menu = document.getElementById('search-menu');
  var menuButton = document.getElementById('search-menu__button');

  if (event.target === menuButton) {
    menu.classList.toggle('open');
    menuButton.classList.toggle('open');
  } else if (!menu.contains(event.target)) {
    menu.classList.remove('open');
    menuButton.classList.remove('open');
  }
});

// функционал выпадающих меню directions
function showContent(index, element) {
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
    if (!selectedContent.contains(event.target) && event.target !== element) {
      selectedContent.style.opacity = '0';
      selectedContent.style.display = 'none';

      element.classList.remove('selected');
    }
  }

  // Предотвращаем закрытие содержимого при клике внутри блока
  function handleClickInside(event) {
    event.stopPropagation();
  }

  document.addEventListener('click', handleClickOutside);
  selectedContent.addEventListener('click', handleClickInside);
}
