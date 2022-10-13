const register_btn = document.getElementById("submit-register");
const username_register = document.getElementById('username-input');
const password_register = document.getElementById('username-pwd');

register_btn.addEventListener("click", () => {

    event.preventDefault()

    //event.preventDefault();
    username = username_register.value;
    password = password_register.value;

    if(username == '' & password == '') {
        window.alert("Please enter an username and a password!")
    } else if (username == '' ) {
        window.alert("Please enter your username!");    
    } else if (password =='') {
        window.alert('Please enter your password!')
    } else {
        fetch('http://localhost:4500/checkUser/?username='+ username + "&password=" + password)
        .then(response => {
            if(response.ok) {
                return response.text();
            }
        }).then(text => {
            if(text) {
                console.log(text)
                if (text == "user already exists") {
                    window.alert("Please chose another username!")
                } else if (text == "user can login") {
                    window.alert("User already exists! Please login.")
                } else if (text == "false") {
                    updateCookie(username)
                    fetch('http://localhost:4500/userRegistration/?username=' + username
                    + "&password=" + password)
                    
                }
            }
        }) 
    }}
    
)