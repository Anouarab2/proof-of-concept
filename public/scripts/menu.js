// Selecteer de hamburger-menuknop
let hamMenu = document.querySelector('.menu-button');

// Selecteer de sluitknop in het zijmenu
let closeButton = document.querySelector('.close-button');

// Selecteer het zijmenu-element
let hamItems = document.querySelector('.side-bar');

// Wanneer op de hamburgerknop wordt geklikt
hamMenu.addEventListener('click', function(e) {
  e.preventDefault(); // Voorkom standaard link- of knopgedrag

  // Wissel de 'active' class op het zijmenu om zichtbaar/onzichtbaar te maken
  hamItems.classList.toggle('active');
});

// Wanneer op de sluitknop wordt geklikt
closeButton.addEventListener('click', function() {
  // Verberg het zijmenu door de 'active' class te verwijderen (of togglen)
  hamItems.classList.toggle('active');
});
