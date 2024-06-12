
document.querySelector('#printButton').addEventListener('click', () => {
    window.print();
})


document.querySelector('#backButton').addEventListener('click', () => {
    history.back();
})

const captured = document.querySelectorAll('.captured')
for (let i = 0; i < capturedValue.length; i++) {
    
    if (capturedValue[i] === 'Snapped') {
        captured[i].innerHTML = `<strong>Snapped to Slot</strong> ${capturedSlot[i]}`;
    } else if (capturedValue[i] === 'SavedIC#') {
        captured[i].innerHTML = `<strong>Saved IC# in Slot</strong> ${capturedSlot[i]}`;
    } else {
        captured[i].innerHTML = '<strong>Not Captured</strong>'
    }
}