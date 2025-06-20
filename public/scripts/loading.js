const form = document.querySelector('form');
const btn = form.querySelector('button[type="submit"]');
const popup = document.getElementById('success-popup');
const btnText = btn.querySelector('.button-text');
const loader = btn.querySelector('.loader');

function showSuccessPopup(message) {
  popup.textContent = message;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 2000);
}

form.onsubmit = async e => {
  e.preventDefault();

  btn.disabled = true;
  btn.classList.add('loading');

  const message = form.message.value.trim();
  if (!message) return;

  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  const ul = document.querySelector('.messages-section ul');
  const li = document.createElement('li');
  li.textContent = data.text || message;
  ul.prepend(li);

  form.reset();
  showSuccessPopup('Bericht succesvol verzonden!');

  btn.disabled = false;
  btn.classList.remove('loading');
};
