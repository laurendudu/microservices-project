const backGame = document.getElementById('backGame-btn');
const score_html = document.getElementById("score")
const avg_html = document.getElementById("avg")

// redirect user back to game
backGame.addEventListener('click', (event) => {
    document.location = '/'
})

// get data for the dashboard
getUsernameData('dashboard'); 

function displayDashboard(score, avg) {
    score_html.innerHTML = `Number of wins: ${score}`;
    avg_html.innerHTML = `Number of average guesses: ${avg}`;
}
