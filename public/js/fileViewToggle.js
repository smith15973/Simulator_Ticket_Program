const picButton = document.querySelector('#pictureButton');
const pdfButton = document.querySelector('#pdfButton');
const docxButton = document.querySelector('#docxButton');
const pictures = document.querySelector('#imageSection')
const pdfs = document.querySelector('#pdfSection')
const docs = document.querySelector('#docsSection')

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.carousel-item')) { 
    } else if (document.querySelector('.embeddedPDF')) {
        pdfs.classList.remove('d-none');
        document.querySelector(`#pdfWindow0`).classList.remove('d-none');
        pdfButton.classList.add('btn-secondary');
        pdfButton.classList.remove('btn-primary');
        pdfButton.classList.add('disabled')
    } else if (document.querySelector('.attachLinks')) {
        docs.classList.remove('d-none');
        docxButton.classList.add('btn-secondary');
        docxButton.classList.remove('btn-primary');
        docxButton.classList.add('disabled')
    }
})

if (picButton) {
    picButton.addEventListener('click', () => {
        pictures.classList.remove('d-none');
        pdfs.classList.add('d-none');
        docs.classList.add('d-none');

        if (picButton) {
        picButton.classList.add('disabled');
        picButton.classList.remove('btn-primary')
        picButton.classList.add('btn-secondary');
        }
        if (pdfButton) {
        pdfButton.classList.remove('disabled');
        pdfButton.classList.remove('btn-secondary');
        pdfButton.classList.add('btn-primary');
        }
        if (docxButton) {
        docxButton.classList.remove('disabled');
        docxButton.classList.remove('btn-secondary');
        docxButton.classList.add('btn-primary');
        }
    })
}


if (pdfButton) {
    pdfButton.addEventListener('click', () => {

        if (document.querySelector(`#pdfWindow0`)) {
            document.querySelector(`#pdfWindow0`).classList.remove('d-none');
            document.querySelector('#pdfTable').value = 0;
        }

        pdfs.classList.remove('d-none');
        pictures.classList.add('d-none');
        docs.classList.add('d-none');

        if (pdfButton) {
        pdfButton.classList.add('disabled');
        pdfButton.classList.remove('btn-primary')
        pdfButton.classList.add('btn-secondary');
        }
        if (picButton) {
        picButton.classList.remove('disabled');
        picButton.classList.remove('btn-secondary');
        picButton.classList.add('btn-primary');
        }
        if (docxButton) {
        docxButton.classList.remove('disabled');
        docxButton.classList.remove('btn-secondary');
        docxButton.classList.add('btn-primary');
        }
    })
}
if (docxButton) {
    docxButton.addEventListener('click', () => {
        docs.classList.remove('d-none');
        pictures.classList.add('d-none');
        pdfs.classList.add('d-none');

        if (docxButton) {
        docxButton.classList.add('disabled');
        docxButton.classList.remove('btn-primary')
        docxButton.classList.add('btn-secondary');
        }
        if (picButton) {
        picButton.classList.remove('disabled');
        picButton.classList.remove('btn-secondary');
        picButton.classList.add('btn-primary');
        }
        if (pdfButton) {
        pdfButton.classList.remove('disabled');
        pdfButton.classList.remove('btn-secondary');
        pdfButton.classList.add('btn-primary');
        }
    })
}

const pdfOption = document.querySelector('#pdfTable');
const pdfWindow = document.querySelector('pdfWindow');
if (pdfOption) {
    pdfOption.addEventListener('change', () => {
        const choice = pdfOption.value;
        for (let i = 0; i < document.querySelectorAll('embed').length; ++i) {
            document.querySelector(`#pdfWindow${i}`).classList.add('d-none');
        }
        document.querySelector(`#pdfWindow${choice}`).classList.remove('d-none');

    })
}


