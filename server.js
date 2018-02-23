const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// Creting the app
const app = express()

hbs.registerPartials(__dirname + '/views/partials/')

// Setting  key/value pair
app.set('view engine', 'hbs')

// Some kind of middleware: a logger
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to  append to server.log')
    }
  })
  next()
})

// stop execution by not calling next()
app.use((req, res, next) => {
  res.render('maintenance.hbs')
})

// serving static content
app.use(express.static(__dirname + '/public'))

// Helper
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})
// Helper mit Argumenten
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
