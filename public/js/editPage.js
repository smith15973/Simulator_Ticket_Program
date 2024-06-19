verifyStatusParams = function() {
    if (statusChoice.value == 'Unassigned') {
        dateClosedObject.removeAttribute('required', true);
        validatedBy.removeAttribute('required', true);
        assignedTo.removeAttribute('required', true);
        workPerformed.removeAttribute('required', true);

        dateClosedObject.setAttribute('disabled', true);
        validatedBy.setAttribute('disabled', true);
        assignedTo.setAttribute('disabled', true);
        workPerformed.setAttribute('disabled', true);
    }

    else if (statusChoice.value === 'In Progress' || statusChoice.value === 'Ready To Test') {
        assignedTo.setAttribute('required', true);
        assignedTo.removeAttribute('disabled');

        dateClosedObject.removeAttribute('required', true);
        validatedBy.removeAttribute('required', true);
        workPerformed.removeAttribute('required', true);

        dateClosedObject.setAttribute('disabled', true);
        validatedBy.setAttribute('disabled', true);
        workPerformed.removeAttribute('disabled', true);

    } else if (statusChoice.value === 'Closed' || statusChoice.value === 'Deferred') {
        dateClosedObject.setAttribute('required', true);
        validatedBy.setAttribute('required', true);
        assignedTo.setAttribute('required', true);
        workPerformed.setAttribute('required', true);

        dateClosedObject.removeAttribute('disabled', true);
        validatedBy.removeAttribute('disabled', true);
        assignedTo.removeAttribute('disabled', true);
        workPerformed.removeAttribute('disabled', true);
    }
}





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

// dateClosedObject.addEventListener('change', function () {
//     if (dateClosedObject.value !== '') {
//         document.querySelector('#status').value = 'Closed';
//     }
// });

const statusChoice = document.querySelector('#status');
const assignedTo = document.querySelector('#assignedTo');
const validatedBy = document.querySelector('#validatedBy');
const workPerformed = document.querySelector('#workPerformed');
const coryID = document.querySelector('#deferredID');



statusChoice.addEventListener('change', verifyStatusParams);
statusChoice.addEventListener('change', () => {
    if (statusChoice.value === 'Closed') {
        if (dateClosedObject.value === '') {
            dateClosedObject.value = new Date().toISOString().split('T')[0];
        }
    }
})


// Captured Slot Toggle
document.querySelectorAll('input[type="radio"][name="captured"]').forEach(function (captured) {
    captured.addEventListener('change', function () {
        const capturedSlotInput = document.getElementById('capturedSlotInput');
        const capturedSlot = document.querySelector('#capturedSlot');
        const slotInvalidFeedback = document.querySelector('#slotInvalidFeedback');
        if (captured.value === 'SavedIC#' || captured.value === 'Snapped') {
            capturedSlotInput.classList.remove('d-none');
            capturedSlot.setAttribute('required', true);
            if (captured.value === 'SavedIC#') {
                capturedSlot.setAttribute('max', 420);
                slotInvalidFeedback.innerText = "1-420"
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
        if (captured === 'SavedIC#') {
            capturedSlot.setAttribute('max', 420);
            slotInvalidFeedback.innerText = "1-420"
        } else {
            capturedSlot.setAttribute('max', 5);
            slotInvalidFeedback.innerText = "1-5"
        }
    } else {
        capturedSlotInput.classList.add('d-none');
        capturedSlot.removeAttribute('required', true);
    }
    verifyStatusParams();
});


