// Selecteer alle tag-knoppen
const buttons = document.querySelectorAll('#tag-buttons button');

// Selecteer alle medewerkers (employee-elementen)
const employees = document.querySelectorAll('.employee');

// Voeg een klik-eventlistener toe aan elke knop
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Haal de tag op uit het data-attribuut van de geklikte knop
    const tag = button.dataset.tag;

    // Loop door alle employee-elementen
    employees.forEach(emp => {
      // Haal de tags van de medewerker op en zet ze om in een array
      const tags = emp.dataset.tags.split(',');

      // Toon of verberg de medewerker op basis van de geselecteerde tag
      if (tag === 'all' || tags.includes(tag)) {
        emp.style.display = 'block'; // Toon medewerker
      } else {
        emp.style.display = 'none'; // Verberg medewerker
      }
    });
  });
});

