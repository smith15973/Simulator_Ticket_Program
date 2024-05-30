function deleteAllChildren(element) {
    // Check if the element has any children
    console.log(element);
    while (element.hasChildNodes()) {
        // Recursively delete children of the first child
        deleteAllChildren(element.firstElementChild);
        // Remove the first child from the element
        element.firstElementChild.remove();
    }
}


document.querySelector('#moreContent').addEventListener('click', function (tickets = [

    {
        "_id": "66586712a971f1a4e56102da",
        "swrNum": "24-01099",
        "dateSubmitted": "2024-05-17T00:00:00.000Z",
        "originator": "Creek",
        "title": "Cliffs, Bullfrog",
        "description": [
            "Maple Sands"
        ],
        "impactedTraining": "No",
        "priority": 1,
        "system": "Software",
        "status": "Unassigned",
        "workPerformed": [],
        "__v": 0
    },
    {
        "_id": "66586712a971f1a4e56102d8",
        "swrNum": "24-01098",
        "dateSubmitted": "2024-05-17T00:00:00.000Z",
        "originator": "Dispersed Camp",
        "title": "Hunting Camp, Elk",
        "description": [
            "Sea Ghost Town"
        ],
        "impactedTraining": "No",
        "priority": 2,
        "system": "Hardware",
        "status": "Unassigned",
        "workPerformed": [],
        "__v": 0
    },
    {
        "_id": "66586712a971f1a4e56102d6",
        "swrNum": "24-01097",
        "dateSubmitted": "2024-05-17T00:00:00.000Z",
        "originator": "Horse Camp",
        "title": "Backcountry, Bullfrog",
        "description": [
            "Silent Creek"
        ],
        "impactedTraining": "No",
        "priority": 4,
        "system": "Hardware",
        "status": "Unassigned",
        "workPerformed": [],
        "__v": 0
    }]) {
    document.querySelector('#moreContent').style.background = 'red'
    let oldTbody = document.querySelector('tbody');
    deleteAllChildren(oldTbody);
    oldTbody.remove()


    const tbody = document.createElement("tbody");

    for (let i = 0; i < 200 && i < tickets.length; ++i) {
        //table row
        let tr = document.createElement('tr');
        tr.classList.add('trow');


        //swr number
        let tdSWR = document.createElement('td');
        tdSWR.classList.add('text-center');

        //next swr number link tag
        let aSWR = document.createElement('a')
        aSWR.location = `/tickets/${tickets[i]._id}`;
        aSWR.innerText = tickets[i].swrNum;
        tdSWR.appendChild(aSWR);

        let tdDateSub = document.createElement('td');
        tdDateSub.classList.add('text-center');
        tdDateSub.innerText = tickets[i].dateSubmitted//.toISOString().substring(0, 10);
        tdDateSub.append('tdSWR');

        let tdOriginator = document.createElement('td');
        tdOriginator.classList.add('text-center');
        tdOriginator.innerText = tickets[i].originator;
        tdOriginator.append('tdDateSub');

        let tdTitle = document.createElement('td');
        tdTitle.classList.add('text-center');
        tdTitle.innerText = tickets[i].title;
        tdTitle.append('tdOriginator');

        let tdDescription = document.createElement('td');
        tdDescription.classList.add('text-center');
        tdDescription.innerText = tickets[i].description;
        tdDescription.append('tdTitle');

        let tdSystem = document.createElement('td');
        tdSystem.classList.add('text-center');
        tdSystem.innerText = tickets[i].system;
        tdSystem.append('tdDescription');

        let tdPriority = document.createElement('td');
        tdPriority.innerText = tickets[i].priority;
        tdPriority.classList.add('text-center');
        tdPriority.append('tdSystem');

        let tdStatus = document.createElement('td');
        tdStatus.innerText = tickets[i].status;
        tdStatus.classList.add('text-center');
        tdStatus.append('tdStatus');

        let tdDateClosed = document.createElement('td');
        if (tickets[i].dateClosed) {
            tdDateClosed.innerText = tickets[i].dateClosed.toISOString().substring(0, 10)
        }
        tdDateClosed.classList.add('text-center');
        tdDateClosed.append('tdDateStatus');

        tr.appendChild(tdSWR);
        tBody.appendChild(tr);

    }
    const thead = document.querySelector('thead');
    thead.append(tbody);
})