const logout = document.getElementById('logout-btn');

logout.addEventListener('click', (event) => {
    deleteSession()
    document.location = '/login/'
})