const form = document.getElementById('login-form');
const input = document.getElementById('username-input');


form.addEventListener("submit", (event) => {

    event.preventDefault();
    username = input.value;

    if (username == '') {
        window.alert("Please enter a valid username!");    
    } else {
        fetch('http://localhost:4500/checkUser/?username=' + username)
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        }).then(text => {
            if(text) {
                // if user exists
                if (text == "true") {
                    updateCookie(username);
                    document.location = '/'
                } else {
                    window.alert("user does not exist! please register first!");
                }
            }
        }).catch(err => console.error(err));
    }
})

