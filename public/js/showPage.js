document.querySelector("#printButton").addEventListener("click", () => {
    window.print();
});


const captured = document.querySelector('.captured')
if (capturedValue === 'Snapped') {
    captured.innerHTML = `<b>Snapped to Slot </b>${capturedSlot}`;
} else if (capturedValue === 'SavedIC#') {
    captured.innerHTML = `<b>Saved IC# in Slot </b>${capturedSlot}`;
} else {
    captured.innerHTML = '<b>Not Captured</b>'
}