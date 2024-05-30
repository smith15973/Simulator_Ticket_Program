//database should be being used ahhhh
const searchBar = document.querySelector('#searchBar');
const trs = document.querySelectorAll('.trow')

searchBar.addEventListener("keyup", function () {
    const searches = searchBar.value.toUpperCase();
    for (let tr of trs) {
        let show = false;
        const tds = tr.querySelectorAll('td');
        for (let td of tds) {
            if (td.innerText.toUpperCase().includes(searches)) {
                show = true;
            }
        }
        if (show) {
            tr.style.display = ""
        } else {
            tr.style.display = "none";
        }
    }
})

// const mongoose = require('mongoose');
// const Ticket = require('./models/ticket');
// const searchQuery = require('./helperFunctions/searchQueries')

// mongoose.connect('mongodb://localhost:27017/simTicketSystem')
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })

// // Create a text index on the fields you want to search
// // You only need to do this once, not every time you perform a search
// Ticket.createIndex({ originator: "text", title: "text", description: "text"});

// // Use pagination to fetch documents in smaller batches
// const page = 1;
// const limit = 10;
// const skip = (page - 1) * limit;

// // Use projection to only fetch the fields you're interested in
// const projection = { originator: 1, title: 1 };

// searchBar.addEventListener("keyup", async function () {
//     const searches = searchBar.value.toUpperCase();
//     const tickets = await Ticket.find({ $text: { $search: searches } }, projection)
//         .skip(skip)
//         .limit(limit);
//     console.log(tickets);
// });

