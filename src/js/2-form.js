import validator from 'validator';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onTextAreaInput);
form.addEventListener('submit', onFormSubmit);

let dataUserForm = JSON.parse(localStorage.getItem(STORAGE_KEY));
const { email, message } = form.elements;

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));

function reoloadPage() {
  if (savedData) {
    email.value = savedData.email || '';
    message.value = savedData.message || '';
    dataUserForm = savedData;
  }
}

function onTextAreaInput(e) {
  dataUserForm = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUserForm));
}

function onFormSubmit(e) {
  e.preventDefault();
  const trimmedEmail = email.value.trim();
  const trimmedMessage = message.value.trim();

  if (!trimmedEmail || !trimmedMessage) {
    return alert(`Будь ласка, заповніть всі обов'язкові поля`);
  }

  if (!validator.isEmail(trimmedEmail)) {
    return alert(`Будь ласка, введіть дійсну електронну адресу`);
  }

  console.log('email:', trimmedEmail, 'massage:', trimmedMessage);
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  dataUserForm = {};
}
reoloadPage();
