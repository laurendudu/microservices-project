const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const os = require("os");

const {readFileSync, promises: fsPromises} = require('fs');

var words;
var randomWord;


// Setup static files
app.use('/static', express.static('public'))

// Main endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/templates/index.html')
})

// Random word endpoint
app.get('/word/', (req, res) => {
  words = ReadWords('data/liste_francais_utf8.txt')
  randomWord = generateRandomWord(words)
  res.send(randomWord)
})

// login endpoint
app.get('/login/', (req, res) => {
  res.sendFile(__dirname + '/public/templates/login.html')
})




app.get('/os', (req, res) => {
  res.send(os.hostname() + " port " + port)
}
)
app.get('/port', (req, res) => {
  res.send("MOTUS APP Listening on port " + port)
}
)

app.get("/health", (req, res) => {
  res.send("healthcheck")
}
)

// 
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




