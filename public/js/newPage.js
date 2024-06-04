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