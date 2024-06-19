document.querySelectorAll('input[type="radio"][name="captured"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const capturedSlotInput = document.getElementById('capturedSlotInput');
        const capturedSlot = document.querySelector('#capturedSlot');
        const slotInvalidFeedback = document.querySelector('#slotInvalidFeedback');
        if (radio.value === 'SavedIC#' || radio.value === 'Snapped') {
            capturedSlotInput.classList.remove('d-none');
            capturedSlot.setAttribute('required', true);
            if (radio.value === 'SavedIC#') {
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