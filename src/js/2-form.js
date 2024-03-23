const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', onTextAreaInput);
form.addEventListener('submit', onFormSubmit);

let dataUserForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;

function reloadPage() {
  if (dataUserForm) {
    email.value = dataUserForm.email || '';
    message.value = dataUserForm.message || '';
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

  if (trimmedEmail === '' || trimmedMessage === '') {
    return alert(`Будь ласка, заповніть всі обов'язкові поля`);
  }

  console.log({ email: trimmedEmail, massage: trimmedMessage });
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  dataUserForm = {};
}
reloadPage();
