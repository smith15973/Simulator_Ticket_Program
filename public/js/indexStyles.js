const prioritys = document.querySelectorAll('.priority');

for (priority of prioritys) {
    priority.style.fontWeight = 'bold';
    if (priority.innerText === "1") {
        priority.style.color = '#FF0000';
    }
    if (priority.innerText === "2") {
        priority.style.color = '#FFA500';
    }
    if (priority.innerText === "3") {
        priority.style.color = '#9B870C';
    }
    if (priority.innerText === "4") {
        priority.style.color = '#1E90FF';
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

const tableRows = document.querySelectorAll(".trow");
        for (const tableRow of tableRows) {
            tableRow.addEventListener("click", function () {
                //window.open(this.dataset.href, "_blank");
                window.location.href = this.dataset.href;
            });
        }