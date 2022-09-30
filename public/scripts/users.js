function updateSession(username) {
   fetch('/setsession/?username=' + username)
}

function deleteSession() {
    fetch('/logout/');
}

// function that calls the username
function getUsernameData(option) {
    fetch('/getUsername/')
    .then(response => {
        if(response.ok) {
            return response.text();
        }
    }).then(text => {
        if(text) {
            if (option == 'dashboard') {
                getData(text, option);
            } else if (option == 'score') {
                getData(text, option)
            }
        }
    }).catch(err => console.error(err));
}

// function that calls the data from the username
function getData(username, option) {
    // display dashboard
    fetch('http://localhost:4500/getUser/?username=' + username)
    .then(response => {
        if(response.ok) {
            return response.text();
        }
    }).then(text => {
        if(text) {
            var username = text.split(";")[0]
            var score = text.split(";")[1]
            var avg = text.split(";")[2]
            var date = text.split(";")[3]
            var boolean = text.split(";")[4]

            if (option == 'dashboard') {
                displayDashboard(score, avg)
            } else if (option == 'score') {
                updateScore(username, score, avg)
            }
        }
    }).catch(err => console.error(err));
}