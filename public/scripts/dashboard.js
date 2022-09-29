const backGame = document.getElementById('backGame-btn');
const score_html = document.getElementById("score")
var score = localStorage.getItem("score")


// redirect user back to game
backGame.addEventListener('click', (event) => {
    document.location = '/'
})

// update user score
function updateScore() {
    
    var score = localStorage.getItem("score")

    if (score){
        score ++;
        localStorage.setItem("score", score)

    } else{
        score = 1;
        localStorage.setItem("score", score)
    }

}

// display score to html
if (score){
    score_html.innerHTML = score

} else{
    score_html.innerHTML = "0";
}


