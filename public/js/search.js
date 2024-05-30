//database should be being used ahhhh
const searchBar = document.querySelector('#searchBar');
const trs = document.querySelectorAll('.trow')

searchBar.addEventListener("keyup",  function() {
    const searches = searchBar.value.toUpperCase();
    // for (let tr of trs) {
    //     let show = false;
    //     const tds = tr.querySelectorAll('td');
    //     for (let td of tds) {
    //         if (td.innerText.toUpperCase().includes(searches)) {
    //             show = true;
    //         }
    //     }
    //     if (show) {
    //         tr.style.display = ""
    //     } else {
    //         tr.style.display = "none";
    //     }
    // }
})

const mongoose = require('mongoose');
const Ticket = require('./models/ticket');
const filterQuery = require('./helperFunctions/filterQueries')

mongoose.connect('mongodb://localhost:27017/simTicketSystem')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

    searchBar.addEventListener("keyup",  async function() {
        const searches = searchBar.value.toUpperCase();
        const tickets = await Ticket.find({*:searches}); //search all categories
        
    }

 