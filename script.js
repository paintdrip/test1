console.log('скрипт запущен');

// Получаем кнопки и поле с контентом
const forwardButton = document.getElementById('forwardButton');
const backButton = document.getElementById('backButton');
const contentField = document.getElementById('contentField');

// Устанавливаем обработчики событий на кнопки
forwardButton.addEventListener('click', scrollForward);
backButton.addEventListener('click', scrollBack);

// Функция для прокрутки вперед
function scrollForward() {
  contentField.scrollBy({ left: 250, behavior: 'smooth' }); // Измените значение 100 на нужное количество пикселей для прокрутки
}

// Функция для прокрутки назад
function scrollBack() {
  contentField.scrollBy({ left: -250, behavior: 'smooth' }); // Измените значение 100 на нужное количество пикселей для прокрутки
}

console.log('скрипт закончен');
