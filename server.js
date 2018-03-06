const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4000;

var userName = 'Gomeh';
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    var now = new Date().toString();
    var log =`${now}: ${req.method} , ${req.url}`

    console.log(`${now}: ${req.method} , ${req.url}`);
    fs.appendFile('server.log', log + '\n', (e) => {
      if (e) {
        console.log('Unable to append to server.log')
      }
    });
    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });
// app.use(express.static(__dirname +'/public'));

// app.get('/', (req, res) => {
  // res.send('<h1> Hello Express </h1>');
//   res.send({
//     name:'Gomeh',
//     likes: [
//       'Biking',
//       'Cities'
//     ]
//   })
// })

app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Millennial Orange Homepage',
    welcomeMessage: `Welcome ${userName}!`,
    currentYear: new Date().getFullYear()
  })
});
app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Us',
    currentYear: new Date().getFullYear()
  })
});
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Potential Project Ideas'
    currentYear: new Date().getFullYear()
  })
})
app.get('/bad', (req, res) =>{
  res.send({
      error: '400',
      message: 'Error Connecting to Server.'
    })
})

app.listen(port, () => {
  console.log(`On Port ${port}`);
});
