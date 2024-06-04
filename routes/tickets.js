const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const SortSelector = require('../helperFunctions/sortSelector');
const MakeSWRNum = require('../helperFunctions/MakeSWRNum')
const filterQuery = require('../helperFunctions/filterQueries')
const searchQuery = require('../helperFunctions/globalSearch')

const Ticket = require('../models/ticket');

/************Generate Reports********************/

//print filtered report
router.get('/report/print', async (req, res) => {
    query = filterQuery(req);
    const tickets = await Ticket.find(query);
    res.render('tickets/printReport', { tickets });
})


//filter generate page
router.get('/generate', async (req, res) => {
    res.render('tickets/generate');
})

//print one report
router.get('/:id/print', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.find({ _id: id });
    res.render('tickets/printReport', { tickets });
})


/************ALL TICKETS********************/

//index of all tickets
router.get('/', async (req, res) => {
    const ticketsPerPage = 300;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * ticketsPerPage;

    const search = req.query.search;
    let query;
    if (search && search !== '') {
        query = searchQuery(req.query.search);
    } else {
        query = filterQuery(req);
    }

    // Get the sorting option from the query
    const sortOption = req.query.sort || '';

    // Serialize query parameters for pagination links
    const queryString = querystring.stringify(req.query);

    // apply sorting in the MongoDB query
    const sort = SortSelector(sortOption);
    const tickets = await Ticket.find(query)
        .collation({ 'locale': 'en' })
        .sort(sort)
        .skip(skip)
        .limit(ticketsPerPage)
        .exec();

    const totalTickets = await Ticket.countDocuments(query)
        .exec();

    res.render('tickets/index', {
        tickets,
        currentPage: page,
        totalPages: Math.ceil(totalTickets / ticketsPerPage),
        queryString: queryString ? `&${queryString}` : '',
        sortOption // Pass the current sort option to the template
    });
});




/************NEW TICKETS********************/

//page to submit a ticket
router.get('/new', async (req, res) => {
    const tickets = await Ticket.find({});
    res.render('tickets/new', { tickets });
})

//post for a new ticket 
router.post('/', async (req, res) => {
    const ticket = await new Ticket(req.body);
    const tickets = await Ticket.find({});
    ticket.swrNum = MakeSWRNum(ticket, tickets);
    ticket.save();
    res.redirect(`/tickets/${ticket._id}`);
})

/************SHOW/EDIT/DELETE/Ticket********************/

//edit one specific ticket
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id)
    const tickets = await Ticket.find({});
    res.render(`tickets/edit`, { ticket, tickets })
})

// PUT edit specific ticket by id
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/tickets/${ticket._id}`);
});


//delete specific ticket by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Ticket.findByIdAndDelete(id);
    res.redirect('/tickets');
});

//show one specific ticket  
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id)
        res.render(`tickets/show`, { ticket })
    } catch (e) {
        res.render('tickets/notFound')
    }
})



module.exports = router;