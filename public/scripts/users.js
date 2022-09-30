// update user score
function updateScore() {

    var username = localStorage.getItem('username')
    var score = localStorage.getItem('score')
    var avg = localStorage.getItem('avg')
    let currentDate = new Date()
    currentDate = currentDate.toISOString().split('T')[0]

    if (score != 0) {
        score ++;
        avg = Math.round(((((score - 1) * avg) + (6 - numberOfGuesses + 1)) / score) * 10, 1) / 10
        localStorage.setItem("score", score)
        localStorage.setItem("avg", avg)
    
    } else {
        score = 1;
        avg = 6 - numberOfGuesses + 1
        localStorage.setItem("score", score)
        localStorage.setItem("avg", avg)
    }
    
    fetch('http://localhost:4500/updateUser/?username=' + username 
        + '&score=' + score
        + '&avg=' + avg
        + '&date=' + currentDate
        + '&boolean=' + true)
}

function storeUser(username) {
    fetch('http://localhost:4500/getUser/?username=' + username)
    .then(response => {
        if(response.ok) {
            return response.text();
        }
    }).then(text => {
        if(text) {
            var user = text.split(';');
            localStorage.setItem("username", user[0]);
            localStorage.setItem("score", user[1]);
            localStorage.setItem("avg", user[2]);
            localStorage.setItem("date", user[3]);
            localStorage.setItem("boolean", user[4]);
        }
    }).catch(err => console.error(err));
}

function updateCookie(username) {
   fetch('http://localhost:4000/setsession/?username=' + username)
}