const urlParams = new URLSearchParams(window.location.search);

let sortParam = urlParams.get('sort');
if (sortParam) {
    document.querySelector('#sort').value = sortParam;
}

const sort = document.querySelector('#sort');
sort.addEventListener('change', () => {
    urlParams.set('sort', sort.value);
    const params = urlParams.toString();
    window.location.href = `${window.location.origin}/tickets?${params}`;
});