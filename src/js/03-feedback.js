import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

// Функція для зберігання стану форми в локальному сховищі
function saveFormStateToLocalStorage() {
  // Створюємо об'єкт, що містить значення полів форми
  const formState = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  // Зберігаємо об'єкт у локальному сховищі, конвертуючи його в JSON-рядок
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}

// Функція для заповнення полів форми зі збереженого стану
function fillFormFieldsFromLocalStorage() {
  // Отримуємо збережений стан з локального сховища
  const storedState = localStorage.getItem('feedback-form-state');

  if (storedState) {
    // Перетворюємо JSON-рядок назад у об'єкт
    const formState = JSON.parse(storedState);

    // Заповнюємо поля форми зі збереженого стану
    emailInput.value = formState.email;
    messageTextarea.value = formState.message;
  }
}

// Відстеження події input на полях форми
emailInput.addEventListener('input', () => {
  // Викликаємо функцію для збереження стану форми
  saveFormStateToLocalStorage();
});

messageTextarea.addEventListener('input', () => {
  // Викликаємо функцію для збереження стану форми
  saveFormStateToLocalStorage();
});

// Перевірка стану сховища при завантаженні сторінки
fillFormFieldsFromLocalStorage();

// Обробка події submit форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  // Видаляємо збережений стан з локального сховища
  localStorage.removeItem('feedback-form-state');

  // Отримуємо значення полів форми
  const emailValue = emailInput.value;
  const messageValue = messageTextarea.value;

  // Виводимо дані у консоль у форматі об'єкта
  console.log('Form Data:', {
    email: emailValue,
    message: messageValue,
  });

  // Очищаємо поля форми
  emailInput.value = '';
  messageTextarea.value = '';
});

// Використовуємо throttle для обмеження збереження стану форми
const saveFormStateThrottled = throttle(saveFormStateToLocalStorage, 500);

// Відстеження події input на полях форми з обмеженням
emailInput.addEventListener('input', saveFormStateThrottled);
messageTextarea.addEventListener('input', saveFormStateThrottled);
