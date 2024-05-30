const ParseDate = require('./ParseDate');

function get4Digits(year, objs) {

    //if array is empty
    if (objs.length === 0) {
        return `0001`;
    }

    //get max digit for matching year
    let maxDigits = 0;
    for (let obj of objs) { //iterate through all
        let swr = obj.swrNum; //get swrNum
        if (swr.slice(0, 2) === year) { //filter to matching years
            let digits = parseInt(swr.substring(3));
            if (digits > maxDigits) { //find biggest in year
                maxDigits = digits; //get biggest
            }
        }
    }
    maxDigits++;
    if (maxDigits < 10) {
        return `000${maxDigits}`;
    } else if (maxDigits < 100) {
        return `00${maxDigits}`;
    } else if (maxDigits < 1000) {
        return `0${maxDigits}`;
    } else {
        return `${maxDigits}`;
    }
}


function createSWR(ticket, tickets) {
    const year = ParseDate.year2Digit(ticket.dateSubmitted);
    return `${year}-${get4Digits(year, tickets)}`
}

module.exports = createSWR;

