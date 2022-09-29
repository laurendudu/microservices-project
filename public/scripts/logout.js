const logout = document.getElementById('logout-btn');

logout.addEventListener('click', (event) => {
    localStorage.removeItem("username")
    localStorage.removeItem("score")

    document.location = '/login/'
})