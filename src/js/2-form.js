import validator from 'validator';

console.log(
  'Is mango@mail.com a valid email?: ',
  validator.isEmail('mango@mail.com')
);
console.log(
  'Is Mangodogmail.com a valid email?: ',
  validator.isEmail('Mangodogmail.com')
);
const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onTextAreaInput);
form.addEventListener('submit', onFormSubmit);

let dataUserForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;

function onTextAreaInput(e) {
  dataUserForm = { email: email.value.trim(), message: message.value.trim() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataUserForm).trim());
}

function reoloadPage() {
  if (dataUserForm) {
    email.value = dataUserForm.email || '';
    message.value = dataUserForm.message || '';
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert(`Будь ласка, заповніть всі поля`);
  }

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  dataUserForm = {};
}
reoloadPage();
