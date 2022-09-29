const form = document.getElementById('login-form');
const input = document.getElementById('username-input');


form.addEventListener("submit", (event) => {

    event.preventDefault();
    username = input.value;

    if (username != '') {
        localStorage.setItem('username', username)
        document.location = "/";
        
    } else {
        window.alert("Please enter a valid username!");
    }

})  