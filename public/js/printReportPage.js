
document.querySelector('#printButton').addEventListener('click', () => {
    window.print();
})


document.querySelector('#backButton').addEventListener('click', () => {
    history.back();
})

const captured = document.querySelectorAll('.captured')
for (let i = 0; i < tickets.length; i++) {
    
    if (tickets[i].captured === 'Snapped') {
        captured[i].innerHTML = `<strong>Snapped to Slot</strong> ${tickets[i].capturedSlot}`;
    } else if (tickets[i].captured === 'SavedIC#') {
        captured[i].innerHTML = `<strong>Saved IC# in Slot</strong> ${tickets[i].capturedSlot}`;
    } else {
        captured[i].innerHTML = '<strong>Not Captured</strong>'
    }
}