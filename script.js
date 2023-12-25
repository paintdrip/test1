console.log('скрипт запущен');

window.onload = () => {
  // устанавливаем настройки
  const options = {
    // родитель целевого элемента - область просмотра
    root: document.querySelector('.articles__container'),
    // без отступов
    rootMargin: '0px',
    // процент пересечения - половина изображения
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

// Устанавливаем обработчики событий на кнопки
const forwardButton = document.getElementById('forwardButton');
forwardButton.addEventListener('click', scrollForward);

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', scrollBack);

console.log('скрипт закончен');

// появление / скрытие верхнего выпадающего меню
document.addEventListener('click', function (event) {
  var menu = document.getElementById('menu');
  var menuButton = document.getElementById('menuButton');

  if (event.target === menuButton) {
    menu.classList.toggle('open');
  } else if (!menu.contains(event.target)) {
    menu.classList.remove('open');
  }
});
