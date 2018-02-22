const express = require('express')
const hbs = require('hbs')

// Creting the app
const app = express()

hbs.registerPartials(__dirname + '/views/partials/')

// Setting  key/value pair
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

// Handler
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'home',
    welcomeMessage:
      'Das ist meine coole Homepage mit dynamischen Inhalt, der per hbs eingestreut wird'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about'
  })
})

app.get('/bad', (req, res) => {
  res.send({ errorMessasge: 'Leider ist hier ein Fehler aufgetreten' })
})

app.listen(3000, () =>
  console.log('Server is up on port 3000 -> call http://localhost:3000/')
)
