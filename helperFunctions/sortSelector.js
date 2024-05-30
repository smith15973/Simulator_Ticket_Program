const Sorts = require('./Sorts')

function sortSelect(sort) {
    switch (sort) {
        case 'swrHigh':
            return Sorts.swrHighFirst;
        case 'swrLow':
            return Sorts.swrLowFirst;
        case 'dateNew':
            return Sorts.dateCreatedNew;
        case 'dateOld':
            return Sorts.dateCreatedOld;
        case 'azName':
            return Sorts.azOriginator;
        case 'zaName':
            return Sorts.zaOriginator;
        case 'p14':
            return Sorts.priority14;
        case 'p41':
            return Sorts.priority41;
        default:
            return Sorts.swrHighFirst;
    }
}
console.log(sortSelect);
module.exports = sortSelect;