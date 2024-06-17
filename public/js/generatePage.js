
document.querySelector('#resetButton').addEventListener('click', () => {
    document.querySelector('#generateForm').reset();
});
document.querySelector("#backButton").addEventListener("click", () => {
    history.back()
});
