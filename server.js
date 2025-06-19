import 'dotenv/config';
import express from 'express';
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')

app.engine('liquid', engine.express());
app.set('view engine', 'liquid');
app.set('views', './views');



app.get('/', async (req, res) => {
  try {
    // Haal employees op
    const employeeResponse = await fetch('https://the-sprint-api.onrender.com/people', {
      headers: {
        'X-API-Key': process.env.API_KEY || ''
      }
    });
    const employeeResponseJSON = await employeeResponse.json();

    // Haal berichten op van Directus (filter op 'homepage')
    const filter = encodeURIComponent(JSON.stringify({ for: { _eq: 'homepage' } }));
    const berichtenResponse = await fetch(`https://fdnd.directus.app/items/messages?filter=${filter}`);
    const berichtenJSON = await berichtenResponse.json();

    // Sorteer berichten op aanmaakdatum, nieuwste eerst
    const berichten = berichtenJSON.data.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Render homepage met beide datasets
    res.render('index.liquid', {
      employees: employeeResponseJSON,
      berichten
    });

  } catch (err) {
    console.error('Fout bij ophalen:', err);
    res.status(500).send('Fout bij het ophalen van data');
  }
});


  app.post('/', async (req, res) => {
    const message = req.body.message;
  
    const bodyData = {
      text: message,
      person: 168,
      for: 'homepage'  // vul hier een waarde in die jij wilt gebruiken om te filteren
    };
  
    console.log('Te versturen data:', bodyData);
  
    const response = await fetch('https://fdnd.directus.app/items/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
  
    const responseData = await response.json();
    console.log('Antwoord van Directus:', responseData);
  
    res.redirect(303, '/');
  });



app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`http://localhost:${app.get('port')}`)
})

// app.use((req, res, next) => {
//   res.status(404).render("404.liquid")
// })