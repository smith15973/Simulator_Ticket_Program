// // defferedID Toggle
// function toggleCompanyID() {
//     const statusChoices = document.getElementById('statusChoices');
//     var status = document.getElementById('status').value;
//     var companyIDField = document.getElementById('companyIDField');
//     if (status === 'Deferred') {
//         companyIDField.style.display = 'block';
//         statusChoices.classList.add('col-sm-6')
//     } else {
//         companyIDField.style.display = 'none';
//         statusChoices.classList.remove('col-sm-6')
//     }
// }

// Initialize the companyIDField display based on the current status
document.addEventListener('DOMContentLoaded', function () {
    // toggleCompanyID();
    console.log(document.querySelector('#dateClosed').value);
});

const dateClosedObject = document.querySelector('#dateClosed');
function toggleClosedStatus() {
if (dateClosedObject.value !== '') {
    document.querySelector('#closedStatus').setAttribute('selected',true)
}
}


// Captured Slot Toggle
document.querySelectorAll('input[type="radio"][name="captured"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        var capturedSlotInput = document.getElementById('capturedSlotInput');
        if (radio.value === 'SavedIC#' || radio.value === 'Snapped') {
            capturedSlotInput.classList.remove('d-none');
        } else {
            capturedSlotInput.classList.add('d-none');
        }
    });
});

// Initialize the capturedSlotInput display based on the current captured value
document.addEventListener('DOMContentLoaded', function () {
    var captured = document.querySelector('input[name="captured"]:checked').value;
    var capturedSlotInput = document.getElementById('capturedSlotInput');
    if (captured === 'SavedIC#' || captured === 'Snapped') {
        capturedSlotInput.classList.remove('d-none');
    } else {
        capturedSlotInput.classList.add('d-none');
    }
});