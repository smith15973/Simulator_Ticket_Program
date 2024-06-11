const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const SortSelector = require('../helperFunctions/sortSelector');
const MakeSWRNum = require('../helperFunctions/MakeSWRNum')
const filterQuery = require('../helperFunctions/filterQueries')
const searchQuery = require('../helperFunctions/globalSearch')

const Ticket = require('../models/ticket');

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/fileUploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage });


const { ticketSchema } = require('../schemas.js');
const validateTicket = (req, res, next) => {
    const { error } = ticketSchema.validate(req.body);
    if (error) {
        const msg = err.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}




/************Generate Reports********************/

//print filtered report
router.get('/report/print', async (req, res) => {
    query = filterQuery(req);
    const tickets = await Ticket.find(query)
        .sort({ swrNum: -1 });
    let includeIndex = 'No';
    if (req.query.includeIndex === 'Yes') {
        includeIndex = 'Yes';
    }
    res.render('tickets/printReport', { tickets, includeIndex });
})


//filter generate page
router.get('/generate', async (req, res) => {
    res.render('tickets/generate');
})

//print one report
router.get('/:id/print', async (req, res) => {
    const { id } = req.params;
    const tickets = await Ticket.find({ _id: id })
    res.render('tickets/printReport', { tickets, includeIndex: 'No' });
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
router.post('/', (upload.array('attachments')), async (req, res) => {
    const ticket = await new Ticket(req.body);
    const tickets = await Ticket.find({});
    ticket.swrNum = MakeSWRNum(ticket, tickets);
    ticket.attachments = req.files.map(f => ({ url: f.path.slice(6), fileName: f.filename, originalName: f.originalname }));
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
router.put('/:id', (upload.array('attachments')), async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    const files = req.files.map(f => ({ url: f.path.slice(6), fileName: f.filename, originalName: f.originalname }));
    ticket.attachments.push(...files);
    await ticket.save();

    if (req.body.deleteFiles) {
        for (let deletedFile of req.body.deleteFiles) {
            const file = ticket.attachments.find(f => f.fileName === deletedFile);
            console.log(file);
            console.log(file.fileName);
            fs.unlinkSync(`public/images/fileUploads/${file.fileName}`);
        }
        await ticket.updateOne({ $pull: { attachments: { fileName: { $in: req.body.deleteFiles } } } });
    }
    console.log(req.body);

    res.redirect(`/tickets/${ticket._id}`);
});


//delete specific ticket by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    for (let file of ticket.attachments) {
        fs.unlinkSync(`public/images/fileUploads/${file.fileName}`);
    }
    res.redirect('/tickets');
});

//show one specific ticket  
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findById(id)
        res.render(`tickets/show`, { ticket })
    } catch (e) {
        res.render('tickets/error')
    }
})

module.exports = router;