document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    document.querySelector('#swrMin').value = urlParams.get('swrMin');
    document.querySelector('#swrMax').value = urlParams.get('swrMax');
    document.querySelector('#dateSubMin').value = urlParams.get('dateSubMin');
    document.querySelector('#dateSubMax').value = urlParams.get('dateSubMax');
    document.querySelector('#dateClosedMin').value = urlParams.get('dateClosedMin');
    document.querySelector('#dateClosedMax').value = urlParams.get('dateClosedMax');
    document.querySelector('#originator').value = urlParams.get('originator');
    document.querySelector('#assignedTo').value = urlParams.get('assignedTo');
    document.querySelector('#validator').value = urlParams.get('validatedBy');
    document.querySelector('#title').value = urlParams.get('title');
    document.querySelector('#description').value = urlParams.get('description');
    document.querySelector('#workPerformed').value = urlParams.get('workPerformed');
    const queryString = urlParams.toString();


    // System
    if (queryString.includes('system=Hardware')) {
        document.querySelector('#hardware').checked = true;
    } else {
        document.querySelector('#hardware').checked = false;
    }

    if (queryString.includes('system=Software')) {
        document.querySelector('#software').checked = true;
    } else {
        document.querySelector('#software').checked = false;
    }

    // Impacted Training
    if (queryString.includes('impactedTraining=Yes')) {
        document.querySelector('#yesAffected').checked = true;
    } else {
        document.querySelector('#yesAffected').checked = false;
    }

    if (queryString.includes('impactedTraining=No')) {
        document.querySelector('#noAffected').checked = true;
    } else {
        document.querySelector('#noAffected').checked = false;
    }

    // Problem Captured
    if (queryString.includes('captured=SavedIC%23')) {
        document.querySelector('#savedIC').checked = true;
    } else {
        document.querySelector('#savedIC').checked = false;
    }

    if (queryString.includes('captured=Snapped')) {
        document.querySelector('#snapped').checked = true;
    } else {
        document.querySelector('#snapped').checked = false;
    }

    if (queryString.includes('captured=Not+Captured')) {
        document.querySelector('#notCaptured').checked = true;
    } else {
        document.querySelector('#notCaptured').checked = false;
    }

    // Status
    if (queryString.includes('status=Unassigned')) {
        document.querySelector('#unassigned').checked = true;
    } else {
        document.querySelector('#unassigned').checked = false;
    }

    if (queryString.includes('status=In+Progress')) {
        document.querySelector('#inProgress').checked = true;
    } else {
        document.querySelector('#inProgress').checked = false;
    }

    if (queryString.includes('status=Ready+To+Test')) {
        document.querySelector('#readyToTest').checked = true;
    } else {
        document.querySelector('#readyToTest').checked = false;
    }

    if (queryString.includes('status=Deferred')) {
        document.querySelector('#deferred').checked = true;
    } else {
        document.querySelector('#deferred').checked = false;
    }
    if (queryString.includes('status=Closed')) {
        document.querySelector('#closed').checked = true;
    } else {
        document.querySelector('#closed').checked = false;
    }


    // Priority Level
    if (queryString.includes('priority=1')) {
        document.querySelector('#priority1').checked = true;
    } else {
        document.querySelector('#priority1').checked = false;
    }

    if (queryString.includes('priority=2')) {
        document.querySelector('#priority2').checked = true;
    } else {
        document.querySelector('#priority2').checked = false;
    }

    if (queryString.includes('priority=3')) {
        document.querySelector('#priority3').checked = true;
    } else {
        document.querySelector('#priority3').checked = false;
    }

    if (queryString.includes('priority=4')) {
        document.querySelector('#priority4').checked = true;
    } else {
        document.querySelector('#priority4').checked = false;
    }
})

document.querySelector('#resetButton').addEventListener('click', () => {
    document.querySelector('#formFilter').reset();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete('search')
});