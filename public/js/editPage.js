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

const dateSubmittedObject = document.querySelector('#dateSubmitted');
const dateClosedObject = document.querySelector('#dateClosed');
document.addEventListener('DOMContentLoaded', function () {
    if (dateSubmittedObject.value !== '') {
        dateClosedObject.setAttribute('min', dateSubmittedObject.value);
    } else {
        dateClosedObject.setAttribute('disabled', true);
    }
});

dateSubmittedObject.addEventListener('change', function () {
    if (dateSubmittedObject.value !== '') {
        dateClosedObject.setAttribute('min', dateSubmittedObject.value);
        dateClosedObject.removeAttribute('disabled', true);
    } else {
        dateClosedObject.setAttribute('disabled', true);
    }
});

dateClosedObject.addEventListener('change', function () {
    if (dateClosedObject.value !== '') {
        document.querySelector('#status').value = 'Closed';
    }
});

const statusChoice = document.querySelector('#status');
statusChoice.addEventListener('change', function () {
    if (statusChoice.value === 'Closed') {
        dateClosedObject.value = new Date().toISOString().split('T')[0];
    } else {
        dateClosedObject.value = '';
    }
});


// Captured Slot Toggle
document.querySelectorAll('input[type="radio"][name="captured"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const capturedSlotInput = document.getElementById('capturedSlotInput');
        const capturedSlot = document.querySelector('#capturedSlot');
        const slotInvalidFeedback = document.querySelector('#slotInvalidFeedback');
        if (radio.value === 'SavedIC#' || radio.value === 'Snapped') {
            capturedSlotInput.classList.remove('d-none');
            capturedSlot.setAttribute('required', true);
            if (radio.value === 'SavedIC#') {
                capturedSlot.setAttribute('max', 350);
                slotInvalidFeedback.innerText = "1-350"
            } else {
                capturedSlot.setAttribute('max', 5);
                slotInvalidFeedback.innerText = "1-5"
            }
        } else {
            capturedSlotInput.classList.add('d-none');
            capturedSlot.removeAttribute('required', true);
        }
    });
});

// Initialize the capturedSlotInput display based on the current captured value
document.addEventListener('DOMContentLoaded', function () {
    const captured = document.querySelector('input[name="captured"]:checked').value;
    const capturedSlotInput = document.getElementById('capturedSlotInput');
    const capturedSlot = document.querySelector('#capturedSlot');
    const slotInvalidFeedback = document.querySelector('#slotInvalidFeedback');
    if (captured === 'SavedIC#' || captured === 'Snapped') {
        capturedSlotInput.classList.remove('d-none');
        capturedSlot.setAttribute('required', true);
        if (radio.value === 'SavedIC#') {
            capturedSlot.setAttribute('max', 350);
            slotInvalidFeedback.innerText = "1-350"
        } else {
            capturedSlot.setAttribute('max', 5);
            slotInvalidFeedback.innerText = "1-5"
        }
    } else {
        capturedSlotInput.classList.add('d-none');
        capturedSlot.removeAttribute('required', true);
    }
});