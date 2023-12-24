console.log('скрипт запущен');

function updateElementOpacity() {
  const elements = document.getElementsByClassName('item-block__item');

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const isVisible = isElementFullyVisible(element);

    if (isVisible) {
      element.style.opacity = '1';
    } else {
      element.style.opacity = '0.2';
    }
  }
}

function isElementFullyVisible(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Вызов функции при загрузке страницы и при изменении размеров окна
window.addEventListener('load', updateElementOpacity);
window.addEventListener('resize', updateElementOpacity);

// Слайдер
const contentField = document.getElementById('contentField');
contentField.addEventListener('scroll', updateElementOpacity);
// Функция для прокрутки вперед
async function scrollForward() {
  await contentField.scrollBy({ left: 250, behavior: 'smooth' });
  updateElementOpacity();
}

// Функция для прокрутки назад
async function scrollBack() {
  await contentField.scrollBy({ left: -250, behavior: 'smooth' });
  updateElementOpacity();
}

// Устанавливаем обработчики событий на кнопки
const forwardButton = document.getElementById('forwardButton');
forwardButton.addEventListener('click', scrollForward);

const backButton = document.getElementById('backButton');
backButton.addEventListener('click', scrollBack);

console.log('скрипт закончен');
