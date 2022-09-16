const express = require('express')
const app = express()
const port = 3000

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

app.get('/wordlist/', (req, res) => {
  words = ReadWords('data/liste_francais_utf8.txt')
  res.send(words)
})



// 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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
  console.log(word)
  
  return word
}




