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

const score_html = document.getElementById("score")

var score = localStorage.getItem("score")

if (score){
    score_html.innerHTML = score

} else{
    score_html.innerHTML = 0
}