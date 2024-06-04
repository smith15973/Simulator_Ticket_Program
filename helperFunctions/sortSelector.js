//onst Sorts = require('./Sorts')

function SortSelector(sortOption) {
    switch (sortOption) {
        case 'swrHigh':
            return { swrNum: -1 };
        case 'swrLow':
            return { swrNum: 1 };
        case 'dateNew':
            return { dateSubmitted: -1 };
        case 'dateOld':
            return { dateSubmitted: 1 };
        case 'azName':
            return { originator: 1};
        case 'zaName':
            return { originator: -1};
        case 'p14':
            return { priority: 1 };
        case 'p41':
            return { priority: -1 };
        default:
            return { swrNum: -1 };
    }
}


// function sortSelect(sort) {
//     switch (sort) {
//         case 'swrHigh':
//             return Sorts.swrHighFirst;
//         case 'swrLow':
//             return Sorts.swrLowFirst;
//         case 'dateNew':
//             return Sorts.dateCreatedNew;
//         case 'dateOld':
//             return Sorts.dateCreatedOld;
//         case 'azName':
//             return Sorts.azOriginator;
//         case 'zaName':
//             return Sorts.zaOriginator;
//         case 'p14':
//             return Sorts.priority14;
//         case 'p41':
//             return Sorts.priority41;
//         default:
//             return Sorts.swrHighFirst;
//     }
// }
module.exports = SortSelector;