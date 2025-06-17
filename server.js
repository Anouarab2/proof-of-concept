import 'dotenv/config';
import express from 'express';
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}))

const engine = new Liquid();
app.engine('liquid', engine.express());

app.set('views', './views')


// app.get('/', async (req, res) => {
 
//     try {
//         const employeeResponse = await fetch ('https://the-sprint-api.onrender.com/people', {
//             headers: {
//                 'X-API-Key': `${process.env.API_KEY}`
//             }
        
//     });
     
//     const employeeResponseJSON = await employeeResponse.json()
//     console.log(employeeResponseJSON.data);
     
//         res.render('index.liquid', { employees:employeeResponseJSON.data});
     
//     } catch (err) {
//         console.error('Fout bij ophalen:', err);
//         res.status(500).send('Fout bij het ophalen van data');
//       }
      
//     });

app.get('/', async (req, res) => {
    try {
      const employeeResponse = await fetch('https://the-sprint-api.onrender.com/people', {
        headers: {
          'X-API-Key': process.env.API_KEY || ''
        }
      });
  
      const employeeResponseJSON = await employeeResponse.json();
  
      console.log('Parsed JSON:', employeeResponseJSON);
  
      // employeeResponseJSON is al een array
      res.render('index.liquid', { employees: employeeResponseJSON });
  
    } catch (err) {
      console.error('Fout bij ophalen:', err);
      res.status(500).send('Fout bij het ophalen van data');
    }
  });


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`http://localhost:${app.get('port')}`)
})

// app.use((req, res, next) => {
//   res.status(404).render("404.liquid")
// })