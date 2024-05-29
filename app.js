const express = require('express');
const path = require('path');
const Ticket = require('./models/ticket');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const Sorts = require('./helperFunctions/Sorts');
const ParseDate = require('./helperFunctions/ParseDate');
const MakeSWRNum = require('./helperFunctions/MakeSWRNum')
const filterQuery = require('./helperFunctions/filterQueries')


mongoose.connect('mongodb://localhost:27017/simTicketSystem');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



/************Generate Reports********************/




//print filtered report
app.get('/tickets/report/print', async (req, res) => {
    query = filterQuery(req);
    const tickets = await Ticket.find(query);
    res.render('tickets/printReport', { tickets });
})


//filter generate page
app.get('/tickets/generate', async (req, res) => {
    res.render('tickets/generate');
})

//print one report
app.get('/tickets/:id/print', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.find({ _id: id });
    res.render('tickets/printReport', { tickets });
})


/************ALL TICKETS********************/

//index of all tickets
app.get('/tickets', async (req, res) => {
    let query = {};

    // Check if priorities are provided
    if (req.query.priority) {
        if (Array.isArray(req.query.priority)) {
            query.priority = { $in: req.query.priority.map(Number) };
        } else {
            query.priority = Number(req.query.priority);
        }
    }

    // Check if systems are provided
    if (req.query.system) {
        if (Array.isArray(req.query.system)) {
            query.system = { $in: req.query.system.map(String) };
        } else {
            query.system = String(req.query.system);
        }
    }





    const tickets = await Ticket.find(req.query);
    tickets.sort(Sorts.swrHighFirst);
    res.render('tickets/index', { tickets, filter: 'All' });

});

/************NEW TICKETS********************/

//page to submit a ticket
app.get('/tickets/new', async (req, res) => {
    const tickets = await Ticket.find({});
    res.render('tickets/new', { tickets });
})

//post for a new ticket 
app.post('/tickets', async (req, res) => {
    const ticket = await new Ticket(req.body);
    const tickets = await Ticket.find({});
    ticket.swrNum = MakeSWRNum(ticket, tickets);
    ticket.save();
    res.redirect(`/tickets/${ticket._id}`);
})

/************SHOW/EDIT/DELETE/Ticket********************/

//edit one specific ticket
app.get('/tickets/:id/edit', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
    const tickets = await Ticket.find({});
    res.render(`tickets/edit`, { ticket, tickets })
})

// PUT edit specific ticket by id
app.put('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/tickets/${ticket._id}`);
});


//delete specific ticket by id
app.delete('/tickets/:id', async (req, res) => {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    res.redirect('/tickets');
});

//show one specific ticket  
app.get('/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id)
        res.render(`tickets/show`, { ticket })
    } catch (e) {
        res.render('tickets/notFound')
    }
})

/************LISTENER********************/
app.listen(3000, () => {
    console.log("Listening on Port 3000!")
}) 