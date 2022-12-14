const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const os = require("os");
const session = require("express-session"); 
//const LokiTransport = require("winston-loki");
const {createLogger, transports} = require("winston")
const loki_uri = process.env.LOKI || "http://127.0.0.1:3100";

const logConfiguration = {
  transports : [
    new transports.Http({
      host: loki_uri,
      json: true,
      labels :{job: 'winston-loki-example'}
    })
  ]
};

const logger = createLogger(logConfiguration)
const {readFileSync, promises: fsPromises} = require('fs');

var words;
var randomWord;
var i=0





// Setup static files
app.use('/static', express.static('public'))

// Setup session
app.use(session({
  secret: "s3Cur3",   // holds the secret key
  name: "cookie", // 
  resave: true,
  saveUninitialized: true

}))

// Session information endpoint
app.get('/session', (req, res) => {
  res.send(JSON.stringify(req.session))
})

// Session information endpoint extra info
app.get('/setsession', (req, res) => {
  username = req.query.username
  req.session.username = username
  logger.info({ message: 'URL '+req.url , labels: { 'url': req.url, 'user':username } })
  res.send(JSON.stringify(req.session))
  
})

// logout
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.send()
})


// Main endpoint
app.get('/', (req, res) => {
  if (req.session.username) {
    res.sendFile(__dirname + '/public/templates/index.html')

  } else {
    res.redirect("/login")
  }
})

// Random word endpoint
app.get('/word/', (req, res) => {
  words = ReadWords('data/liste_francais_utf8.txt')
  randomWord = generateRandomWord(words)
  res.send(randomWord)
})

// login endpoint
app.get('/login/', (req, res) => {
  if (req.session.username) {
    res.redirect("/")
  } else {
    res.sendFile(__dirname + '/public/templates/login.html')
  } 
})

// get username
app.get('/getUsername/', (req, res) => {
  res.send(req.session.username)
})

// score endpoint
app.get('/dashboard/', (req, res) => {
  if (req.session.username) {
    res.sendFile(__dirname + '/public/templates/dashboard.html')
  } else {
    res.sendFile(__dirname + '/public/templates/login.html')
  
   }

}
)


app.get('/os', (req, res) => {
  res.send(os.hostname() + " port " + port)
})

app.get('/port', (req, res) => {
  res.send("MOTUS APP Listening on port " + port)
})

app.get("/health", (req, res) => {
  res.send("healthcheck")
})

app.listen(port, () => {
  console.log(`Sutom app listening on port ${port}`)
})

// Read word array
function ReadWords(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}

// Generate random index
const randomIndex = () => {
  const date = new Date();
  return (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % words.length
}

// Generate random word from random index
function generateRandomWord(array) {
  word = array[randomIndex()]  
  return word
}




