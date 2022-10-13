const row_1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]
const row_2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"]
const row_3 = ["z", "x", "c", "v", "b", "n", "m"]

const rows = [row_1, row_2, row_3]


function initKeyboard() {

    for (i = 1; i <= 3; i++) {
        const row_html = document.getElementById(`row_${i}`)
        const letters = rows[i - 1]

        for (const letter of letters) {
            row_html.innerHTML += `<td id="${letter}">${letter}</td>` 
        }
    }
}
