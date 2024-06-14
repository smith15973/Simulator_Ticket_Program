document.querySelector("#printButton").addEventListener("click", () => {
    window.print();
});

document.querySelector("#backButton").addEventListener("click", () => {
    history.back()
});
document.querySelector('#pageBreak').remove();

function jsonEscape(str)  {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

ticket = JSON.parse(jsonEscape(ticket));

const captured = document.querySelector('.captured')
if (ticket.captured === 'Snapped') {
    captured.innerHTML = `<b>Snapped to Slot </b>${ticket.capturedSlot}`;
} else if (ticket.captured === 'SavedIC#') {
    captured.innerHTML = `<b>Saved IC# in Slot </b>${ticket.capturedSlot}`;
} else {
    //captured.innerHTML = '<b>Not Captured</b>'
}
