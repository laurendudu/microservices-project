const form  = document.getElementById('word-input-form');
const input = document.getElementById('word-input');
const guessingTable = document.getElementById('guessing')

var guess;
var word;

const numberOfGuesses = 6;

// get the word from api
fetch('http://localhost:3000/word/')
.then(response => {
    if(response.ok) {
        return response.text();
    }
}).then(text => {
    if(text) {
        console.log(text);
        word = text;

        initGuessing(word);
    }
}).catch(err => console.error(err));





// submit guess
form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    guess = input.value;
    input.value = ''

    
    console.log(guess)
});

function initGuessing(word) {

    for (g = 1; g <= numberOfGuesses; g++) {
        guessingTable.innerHTML += `<tr id="guess${g}"></tr>`

        for (letter = 0; letter < word.length; letter++) {
            var row = document.getElementById(`guess${g}`)

            if (g == 1 && letter == 0) {
                row.innerHTML += `<td>${word[0]}</td>`
            } else {
                row.innerHTML += `<td></td>`
            }
            
        }
    }
    
}

