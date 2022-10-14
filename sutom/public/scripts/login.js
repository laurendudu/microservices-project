const form_btn = document.getElementById('submit-login');
const username_input = document.getElementById('username-input');
const password_input = document.getElementById('username-pwd');


form_btn.addEventListener("click", (event) => {

    event.preventDefault();
    username = username_input.value;
    password = password_input.value;

    if (username == '') {
        window.alert("Please enter a valid username!");    
    } else {
        fetch('http://localhost:4500/checkUser/?username=' + username
        + "&password=" + password)
    
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        }).then(text => {
            if(text) {
                // if user exists
                if (text == "user can login") {
                    updateCookie(username);
                } else if (text == "user already exists") {
                    window.alert("The entered password is incorrect!");
                } else {
                    window.alert("The entered username does not exist! Please register first.");
                }
            }
        }).catch(err => console.error(err));
    }
})

