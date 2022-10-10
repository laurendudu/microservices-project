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
                if (text == "user can login") {
                    updateCookie(username);

                    document.location = '/'
                } else {
                    window.alert("user does not exist! please register first!");
                }
            }
        }).catch(err => console.error(err));
    }
})

