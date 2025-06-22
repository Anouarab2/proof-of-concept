// Selecteer het formulier-element
const form = document.querySelector('form');

// Selecteer de submit-knop binnen het formulier
const btn = form.querySelector('button[type="submit"]');

// Selecteer het popup-element dat verschijnt bij succes
const popup = document.getElementById('success-popup');

// Selecteer de tekst en loader binnen de knop
const btnText = btn.querySelector('.button-text');
const loader = btn.querySelector('.loader');

// Toon een tijdelijke succesmelding
function showSuccessPopup(message) {
  popup.textContent = message;
  popup.classList.add('show');

  // Verberg de popup automatisch na 2 seconden
  setTimeout(() => popup.classList.remove('show'), 2000);
}

// Verwerk het formulier wanneer het wordt verzonden
form.onsubmit = async e => {
  e.preventDefault(); // Voorkom standaard formuliergedrag (pagina herladen)

  // Zet de knop in "loading state"
  btn.disabled = true;
  btn.classList.add('loading');

  // Haal de ingevoerde boodschap op en trim spaties
  const message = form.message.value.trim();
  if (!message) return; // Stop als veld leeg is

  // Verstuur het bericht naar de server via POST
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();

  // Voeg het nieuwe bericht toe aan het begin van de lijst met berichten
  const ul = document.querySelector('.messages-section ul');
  const li = document.createElement('li');
  li.textContent = data.text || message; // Gebruik API-respons of fallback
  ul.prepend(li);

  // Maak het formulier leeg en toon succesmelding
  form.reset();
  showSuccessPopup('Bericht succesvol verzonden!');

  // Zet knop terug naar normale status
  btn.disabled = false;
  btn.classList.remove('loading');
};
