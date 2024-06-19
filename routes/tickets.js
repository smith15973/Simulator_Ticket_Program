const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const SortSelector = require('../helperFunctions/sortSelector');
const MakeSWRNum = require('../helperFunctions/MakeSWRNum')
const filterQuery = require('../helperFunctions/filterQueries')
const searchQuery = require('../helperFunctions/globalSearch')
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage, cloudinary } = require('../cloudinary/index');
const upload = multer({ storage })


const { isLoggedIn, isAuthor, validateTicket } = require('../middleware');

const Ticket = require('../models/ticket');

/************Generate Reports********************/

//print filtered report
router.get('/report/print', isLoggedIn, catchAsync(async (req, res) => {
    query = filterQuery(req, res);
    const tickets = await Ticket.find(query)
        .sort({ swrNum: -1 });
    let includeIndex = 'No';
    if (req.query.includeIndex === 'Yes') {
        includeIndex = 'Yes';
    }
    res.render('tickets/printReport', { tickets, includeIndex });
}));


//filter generate page
router.get('/generate', isLoggedIn, catchAsync(async (req, res) => {
    res.render('tickets/generate');
}));

/************ALL TICKETS********************/

//index of all tickets

router.route('/')
    .get(isLoggedIn, catchAsync(async (req, res) => {
        const ticketsPerPage = 300;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * ticketsPerPage;

        const search = req.query.search;
        let query;
        if (search && search !== '') {
            query = searchQuery(req.query.search, res);
        } else {
            query = filterQuery(req, res);
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
            sortOption, // Pass the current sort option to the template
            totalTickets
        });
    }))
    //post for a new ticket 
    .post(isLoggedIn, upload.array('attachments'), validateTicket, catchAsync(async (req, res) => {
        req.flash('success', 'Successfully Submitted Ticket!');
        const ticket = new Ticket(req.body);
        const tickets = await Ticket.find({});
        ticket.swrNum = MakeSWRNum(ticket, tickets);
        ticket.attachments = req.files.map(f => ({ url: f.path, fileName: f.filename, originalName: f.originalname }));
        ticket.author = res.locals.currentUser;
        await ticket.save();
        res.redirect(`/tickets/${ticket._id}`);
    }));



/************NEW TICKETS********************/

//page to submit a ticket
router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    const tickets = await Ticket.find({});
    res.render('tickets/new', { tickets });
}))



/************SHOW/EDIT/DELETE/Ticket********************/



//show one specific ticket  
router.route('/:id')
    .get(isLoggedIn, isAuthor, catchAsync(async (req, res) => {
        const ticket = await Ticket.findById(req.params.id).populate('author');
        if (!ticket) {
            req.flash('error', 'Cannot Find That Ticket!');
            return res.redirect('/tickets');
        }
        res.render(`tickets/show`, { ticket })
    }))
    .put(isLoggedIn, isAuthor, upload.array('attachments'), validateTicket, catchAsync(async (req, res) => {
        const { id } = req.params;
        if (await Ticket.exists({ swrNum: req.body.swrNum, _id: { $ne: id } })) {
            req.flash('error', 'SWR Number Already Exists!');
            return res.redirect(`/tickets/${id}/edit`);
        }
        req.flash('success', 'Successfully Updated Ticket!');
        const ticket = await Ticket.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
        const files = req.files.map(f => ({ url: f.path, fileName: f.filename, originalName: f.originalname }));
        ticket.attachments.push(...files);
        await ticket.save();

        if (req.body.deleteFiles) {
            for (let fileName of req.body.deleteFiles) {
                console.log(fileName);
                await cloudinary.uploader.destroy(fileName);
            }
            await ticket.updateOne({ $pull: { attachments: { fileName: { $in: req.body.deleteFiles } } } });
        }

        res.redirect(`/tickets/${ticket._id}`);
    }))
    .delete(isLoggedIn, isAuthor, catchAsync(async (req, res) => {
        req.flash('success', 'Successfully Deleted Ticket!');
        const { id } = req.params;
        const ticket = await Ticket.findByIdAndDelete(id);
        for (let file of ticket.attachments) {
            await cloudinary.uploader.destroy(file.fileName);;
        }
        res.redirect('/tickets');
    }));


//edit one specific ticket
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
        req.flash('error', 'Cannot Find That Ticket!');
        return res.redirect('/tickets');
    }
    const tickets = await Ticket.find({});
    res.render(`tickets/edit`, { ticket, tickets })
}));




module.exports = router;