const form = document.getElementById('login-form');
const input = document.getElementById('username-input');
const password_input = document.getElementById('username-pwd')


form.addEventListener("submit", (event) => {

    event.preventDefault();
    username = input.value;
    password = password_input.value;

    if (username == '') {
        window.alert("Please enter a valid username!");    
    } else {
        fetch('/checkUser/?username=' + username
        + "&password=" + password)
    
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        }).then(text => {
            if(text) {
                // if user exists
                console.log(text)
                if (text == "true") {
                    updateSession(username);
                    document.location = '/'
                } else {
                    window.alert("user does not exist! please register first!");
                }
            }
        }).catch(err => console.error(err));
    }
})

