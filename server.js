// Laad environment variabelen uit .env bestand
import 'dotenv/config';

import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();

// Maak de map "public" beschikbaar als statische assets (CSS, JS, images, etc.)
app.use(express.static("public"));

// Parse JSON-body van inkomende requests
app.use(express.json());

// Parse URL-gecodeerde data (bijv. van HTML formulieren)
app.use(express.urlencoded({ extended: true }));

// Stel de Liquid templating engine in
const engine = new Liquid();
app.engine('liquid', engine.express());

// Stel de views-map en view engine in
app.set('views', './views');
app.set('view engine', 'liquid');

// Homepage route
app.get('/', async (req, res) => {
  try {
    // Haal employees op van externe API
    const employeeResponse = await fetch('https://the-sprint-api.onrender.com/people', {
      headers: {
        'X-API-Key': process.env.API_KEY || ''
      }
    });
    const employeeResponseJSON = await employeeResponse.json();

    // Haal berichten op van Directus (gefilterd op 'homepage')
    const filter = encodeURIComponent(JSON.stringify({ for: { _eq: 'homepage' } }));
    const berichtenResponse = await fetch(`https://fdnd.directus.app/items/messages?filter=${filter}`);
    const berichtenJSON = await berichtenResponse.json();

    // Sorteer berichten op aanmaakdatum (nieuwste eerst)
    const berichten = berichtenJSON.data.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Render de homepage met opgehaalde data
    res.render('index.liquid', {
      employees: employeeResponseJSON,
      berichten
    });

  } catch (err) {
    console.error('Fout bij ophalen:', err);
    res.status(500).send('Fout bij het ophalen van data');
  }
});

// POST-route om een nieuw bericht te plaatsen
app.post('/', async (req, res) => {
  const message = req.body.message;

  // Data die wordt verzonden naar Directus API
  const bodyData = {
    text: message,
    person: 168, // hardcoded persoon-ID
    for: 'homepage'
  };

  try {
    // Verstuur POST request naar Directus API
    const response = await fetch('https://fdnd.directus.app/items/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });

    const responseData = await response.json();

    // Geef de response terug aan de client
    res.status(200).json(responseData.data);
  } catch (err) {
    res.status(500).json({ error: 'Fout bij verzenden' });
  }
});

// Render de menu-pagina
app.get('/menu', async (request, response) => {
  response.render('menu.liquid');
});

// Stel de poort in waarop de server draait (via .env of standaard 8000)
app.set('port', process.env.PORT || 8000);

// Start de server
app.listen(app.get('port'), function () {
  console.log(`http://localhost:${app.get('port')}`);
});

// Fallback route voor 404 - Pagina niet gevonden
app.use((req, res, next) => {
  res.status(404).render("404.liquid");
});
