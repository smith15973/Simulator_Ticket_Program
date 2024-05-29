const prioritys = document.querySelectorAll('.priority');

for (priority of prioritys) {
    if (priority.innerText === "4") {
        priority.style.color = 'red';
    }
}

const statuses = document.querySelectorAll('.status');

for (statuss of statuses) {
    if (statuss.innerText === "Unassigned") {
        statuss.style.color = 'red';
    } else if (statuss.innerText === "Closed") {
        statuss.style.color = 'green';
    }
}