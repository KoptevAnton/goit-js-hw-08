// Імпортуємо необхідну бібліотеку Vimeo Player API
import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Отримуємо посилання на елемент iframe з ID "vimeo-player"
const iframe = document.getElementById('vimeo-player');

// Ініціалізуємо плеєр
const player = new Player(iframe);

// Отримуємо збережений час відтворення з локального сховища
const savedTime = localStorage.getItem('videoplayer-current-time');

// Функція для збереження часу відтворення в сховищі зі затримкою
const saveCurrentTime = throttle(currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);

// Відслідковуємо подію timeupdate - оновлення часу відтворення
player.on('timeupdate', data => {
  // Отримуємо поточний час відтворення
  const currentTime = data.seconds;

  // Зберігаємо час відтворення у локальному сховищі
  saveCurrentTime(currentTime);
});

// Перевіряємо, чи є збережений час відтворення та відновлюємо відтворення
if (savedTime) {
  player.setCurrentTime(savedTime);
}
