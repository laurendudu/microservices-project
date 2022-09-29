const backGame = document.getElementById('backGame-btn');
const score_html = document.getElementById("score")
const avg_html = document.getElementById("avg")
var score = localStorage.getItem("score")
var avg = localStorage.getItem("avg")


// redirect user back to game
backGame.addEventListener('click', (event) => {
    document.location = '/'
})

// update user score
function updateScore() {
    
    var score = localStorage.getItem("score")
    var avg = localStorage.getItem("avg")

    if (score) {
        score ++;
        localStorage.setItem("score", score)

        avg = (((score - 1) * avg) + (6 - numberOfGuesses + 1)) / score
        localStorage.setItem("avg", avg)

    } else {
        score = 1;
        avg = 6 - numberOfGuesses + 1
        console.log(numberOfGuesses)
        localStorage.setItem("score", score)
        localStorage.setItem("avg", avg)
    }

}

// display score to html
if (score) {
    score_html.innerHTML = `Number of words guessed: ${score}`;
} else {
    score_html.innerHTML = "Number of words guessed: 0";
}

if (avg) {
    avg_html.innerHTML = `Average number of guesses: ${avg}`;
} else {
    avg_html.innerHTML = "Average number of guesses: 0"
}
