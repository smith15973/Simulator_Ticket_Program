// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
//const session = require('express-session');
const MongoStore = require("connect-mongo");
const ticketRoutes = require('./routes/tickets');
const favicon = require('serve-favicon');
const ExpressError = require('./utils/ExpressError');


const dbURL = 'mongodb://localhost:27017/simTicketSystem'
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'images', 'ticketFavicon.png')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/attachments', express.static('/'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));





// const store = MongoStore.create({
//     mongoUrl: dbURL,
//     touchAfter: 24 * 60 * 60,
//     crypto: {
//         secret: 'DavisBesse',
//     }
// });

// store.on("error", function (e) {
//     console.log("Session Store Error", e)
// })

// const sessionConfig = {
//     store,
//     name: 'session',
//     secret: 'DavisBesse',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         //secure: true,
//         expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//         maxAge: 1000 * 60 * 60 * 24 * 7
//     }
// }

app.use('/tickets', ticketRoutes);


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})


app.use((err,req,res,next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('tickets/error', {err});
})

/************LISTENER********************/
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
}) 