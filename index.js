const express = require('express')
const app = express()
const port = 3000

const {readFileSync, promises: fsPromises} = require('fs');


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function ReadWords(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

words = ReadWords('data/liste_francais_utf8.txt')

const randomIndex = () => {
  const date = new Date();
  return (date.getFullYear() * date.getDate() * (date.getMonth() + 1)) % words.length
}


function generateRandomWord(array) {
  console.log(array[randomIndex()])
}

generateRandomWord(words)