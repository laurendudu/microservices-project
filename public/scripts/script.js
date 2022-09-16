const form  = document.getElementById('word-input-form');
const input = document.getElementById('word-input');
const guessingTable = document.getElementById('guessing')

var guess;
var word;

var numberOfGuesses = 6;
var rowNumber = 1;

var letters = [0, 0, 0, 0, 0, 0];

// initialize the game
fetch('http://localhost:3000/word/')
    .then(response => {
        if(response.ok) {
            return response.text();
        }
    }).then(text => {
        if(text) {
            word = text;
            initGuessing(word);
        }
    }).catch(err => console.error(err));


// submit guess
form.addEventListener('submit', (event) => {
    // stop form submission
    event.preventDefault();
    guess = input.value;

    // get word
    fetch('http://localhost:3000/word/')
.   then(response => {
        if(response.ok) {
            return response.text();
        }
    }).then(text => {
        if(text) {
            word = text;
            // if guess does not fit word format
            if (guess.length != word.length) {
                window.alert("Your word does not have the correct amount of letters !");
            } else {
                guessWord(guess, word)
                input.value = ''
            }
        }
    }).catch(err => console.error(err));
    
});

function initGuessing(word) {
    for (g = 1; g <= numberOfGuesses; g++) {
        guessingTable.innerHTML += `<tr id="guess${g}"></tr>`

        for (letter = 0; letter < word.length; letter++) {
            var row = document.getElementById(`guess${g}`)

            if (letter == 0 && g == 1) {
                row.innerHTML += `<td id="g${g}l${letter}">${word[0]}</td>`
            } else {
                row.innerHTML += `<td id="g${g}l${letter}"></td>`
            }
        }
    }
}

function guessWord(guess, word) {

    word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    var colors_array = []

    letters[0] = word[0]
    

    for (letter = 0; letter < guess.length; letter++) {
        var cell = document.getElementById(`g${rowNumber}l${letter}`) 
        cell.innerHTML = guess[letter]

        if (guess[letter] == word[letter]) {
            cell.style.backgroundColor = "#6ca965"
            colors_array.push('yes')
            if (letters[letter] == 0) {
                letters[letter] = guess[letter]
            }
            
        } else if (word.includes(guess[letter])) {
            cell.style.backgroundColor = "#c8b653"
            colors_array.push('maybe')
        } else {
            cell.style.backgroundColor = "#787c7f"
            colors_array.push('no')
        }
    }

    if (numberOfGuesses != 1) {
        for (letter = 0; letter < letters.length; letter++) {
            const cell = document.getElementById(`g${rowNumber + 1}l${letter}`)
            if (letters[letter] != 0) {
                cell.innerHTML = letters[letter]
            } 
        }
    }

    if (new Set(colors_array).size == 1 && colors_array.length == word.length && colors_array[0] == "yes") {
        document.getElementById("button").disabled = true;
        const messageDiv = document.getElementById("message")
        messageDiv.innerHTML = '<p>Felicitations, reviens demain pour un max de fun.</p>'
        for (letter = 0; letter < letters.length; letter++) {
            var cell = document.getElementById(`g${rowNumber + 1}l${letter}`)
            cell.innerHTML = ''
        }
    } 

    if (numberOfGuesses == 1) {
        document.getElementById("button").disabled = true;
        if (letters.includes(0)) {
            var messageDiv = document.getElementById("message")
            messageDiv.innerHTML = `<p>T'es un peu nul.</p> <p>La reponse etait <span>${word}</span>.</p>`
        }
    } 



    


    console.log(numberOfGuesses);
    numberOfGuesses--;
    rowNumber++;
    
}

