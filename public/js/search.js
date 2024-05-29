const searchBar = document.querySelector('#searchBar');
const trs = document.querySelectorAll('.trow')

searchBar.addEventListener("keyup",  function() {
    const searches = searchBar.value.toUpperCase();
    for (let tr of trs) {
        let show = false;
        const tds = tr.querySelectorAll('td');
        for (let td of tds) {
            if (td.innerText.toUpperCase().includes(searches)) {
                show = true;
            }
        }
        if (show) {
            tr.style.display = ""
        } else {
            tr.style.display = "none";
        }
    }
})