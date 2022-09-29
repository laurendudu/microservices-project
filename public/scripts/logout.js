const logout = document.getElementById('logout-btn');

logout.addEventListener('click', (event) => {
    localStorage.removeItem("username")

    document.location = '/login/'
})